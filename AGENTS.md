# Quran Tajweed Plugin — Architecture Guide

## Overview

Obsidian plugin that renders Quranic verses with Tajweed color-coding, audio playback, translation, transliteration, and tafsir. Uses Uthmanic Hafs font. Fetches from AlQuran.cloud API, Quran.com API v4, fawazahmed0/quran-api, and islamic.app tafsir API.

## File Structure

```
obsidian-tajweed-plugin/
├── main.js          # Plugin logic (entry point, ~1270 lines)
├── styles.css       # All UI styles (loaded automatically by Obsidian)
├── manifest.json    # Plugin metadata
├── AGENTS.md        # This file
├── README.md        # User-facing docs
└── data/
    ├── quran-tajweed.json            # Pre-tagged Tajweed text data
    ├── surahs.json                   # Surah names/metadata
    └── translation-en-sahih.json     # English translation
```

## Architecture

### `main.js` — Single-file plugin

**Entry Point:** `QuranTajweedPlugin` class (extends `Plugin`)

| Section | Description |
|---------|-------------|
| Constants | `TAJWEED_COLORS`, `RULE_MAP`, `AVAILABLE_RECITERS`, `SURAHS` (inlined) |
| `onload()` | Registers code block processors, settings tab, commands, editor menu |
| Settings defaults/load/save | Defaults with `true` for audio/translation/transliteration; proper `!== undefined` checks |
| Parsers | `parseReciterFromSource()`, `parseAudioFromSource()`, `extractVerseReference()`, `removeParameters()` |
| `renderQuranWithTajweed()` | Main render pipeline: nav bar → check cache → fetch API → parse Tajweed → build DOM → controls |
| `parseTajweed()` | Converts `[rule[text]]` notation into colored `<span>` elements |
| `createRangePlaybackControls()` | Creates controls bar (gear + play/stop/repeat) for ALL blocks |
| `updateSourceParam()` | Vault API — persists gear toggles to source file, scoped to ` ```quran ` block |
| `updateSourceRange()` | Vault API — persists nav range change to source file, matches exact oldRef |
| Cache helpers | `getCache()`, `setCache()` using `localStorage` |
| `enableAudio()` / `disableAudio()` | Show/hide audio players and controls |
| `showTafsir()` | Fetches tafsir from islamic.app API, shows centered popover |
| `QuranTajweedSettingTab` | Settings UI (reciter, font size, defaults, translation version, tafsir version) |

### Data flow

```
Code block (e.g., ```quran 1:1-5```)
  → registerMarkdownCodeBlockProcessor('quran')
    → renderQuranWithTajweed()
      → extractVerseReference()  → parse "1:1-5"
      → getCache() → check localStorage for surah data
        → miss: fetch() from AlQuran.cloud API (Arabic + Transliteration)
                → setCache() → store in localStorage
        → hit: skip network entirely (0 requests)
      → fetch translation (quran-com / fawazahmed / alquran-cloud sources)
      → parseTajweed() → regex replaces [rule[text]] with <span class="tajweed-xxx">
      → createRangePlaybackControls() (always, gear button + play/stop/repeat)
      → createAudioPlayer() per verse (if audio on)
```

### Gear popover → source editing

```
Gear toggle clicked
  → applyToggle()  → instant DOM update (show/hide translation/transliteration/audio)
  → updateSourceParam() → vault.read → find ```quran block → update param line → vault.modify
  → Obsidian re-renders the block with new params (persists across reloads)
```

### Nav dropdown → source editing

```
Surah/verse dropdown changed
  → renderQuranWithTajweed() → instant re-render with new range
  → updateSourceRange() → vault.read → find ```quran block matching oldRef → update reference → vault.modify
  → Obsidian re-renders with updated range (persists across reloads)
```

### Key design decisions

- **Settings defaults**: `defaultAudio: true`, `defaultTranslation: true`, `defaultTransliteration: true`
- **Command palette**: inserts ` ```quran\naudio="on"\ntranslation="on"\ntransliteration="on"\n1:1\n``` `
- **Inline SVGs** for play/stop/gear icons (no emoji)
- **Vault API** (`app.vault.read`/`modify`) for source persistence — works on mobile and desktop
- **Multi-block safety**: `updateSourceParam` and `updateSourceRange` scope searches to ` ```quran ` block boundaries and match exact old values
- **Cache key includes source name** to bust stale entries: `quran-surah-{n}-trans-{source}-{versionId}`
- **Translation sources**: `alquran-cloud`, `quran-com`, `fawazahmed`
- **Tafsir**: fetched from `api.islamic.app/v1/verses/by_key/{surah}:{verse}?tafsirs={slug}`, centered popover
- **`getSectionInfo`** wrapped in try-catch for mobile compatibility

### Experimental QCF V4 Tajweed

The `experimentalV4Tajweed` setting (off by default) enables rendering using the **QCF V4 Tajweed color font** from the Tarteel CDN. Tajweed colors are baked into the font's COLR/CPAL tables instead of being applied via CSS `<span>` tags, giving automatic per-letter coloring identical to Quran.com's Tajweed Mushaf.

**Data flow:**
```
Setting enabled → fetchV4WordData(surah) → fetch word data from Quran.com API with &words=true
  → cache in localStorage (key: quran-v4-words-{surah})
  → collect all unique page numbers across the verse range
  → ensureV4FontLoaded(page) → inject @font-face for each per-mushaf-page font from Tarteel CDN
  → renderV4ColoredText() → render each word with code_v1 codepoint + per-page font-family
  → COLR/CPAL tables in the font automatically color tajweed rules
```

**Font source:** `https://static-cdn.tarteel.ai/qul/fonts/quran_fonts/v4-tajweed/woff2/p{N}.woff2` (604 per-mushaf-page woff2 fonts)
**Word data source:** Quran.com API v4 — `https://api.quran.com/api/v4/verses/by_chapter/{surah}?words=true&word_translation_language=en&per_page=300`

**Key details:**
- 604 per-mushaf-page woff2 fonts, dynamically loaded as needed
- Each word from the API has `code_v1` (Arabic Presentation Form codepoint) and `page_number` (1-604)
- Font's COLR/CPAL tables apply tajweed colors automatically — no CSS color spans needed
- Words rendered individually with per-page `font-family: v4-p{N}` and space separators
- Falls back to standard `parseTajweed()` CSS coloring if V4 data fails to load or a verse is missing
- Audio, translation, transliteration, nav bar all work identically in V4 mode
- Wrapping requires `unicode-bidi: bidi-override` and `overflow-wrap: anywhere` on `.quran-verse-text`

**Adding to settings:** Follow the standard pattern (default in `onload()`, load in `loadSettings()`, save in `saveSettings()`, UI in `QuranTajweedSettingTab.display()`).

## Code Conventions

- **No comments** in code — keep logic self-explanatory
- **No emoji in code** — only use emoji in log messages if needed
- **CSS variables** — use Obsidian's `var(--background-primary)`, `var(--interactive-accent)`, etc.
- **Classes prefixed with `quran-`** — avoid conflicts with other plugins

## How to Make Changes

### Adding a new feature

1. Add CSS class rules to `styles.css`
2. Add logic in `main.js` following existing patterns
3. If adding a setting, add to: `onload()` defaults, `loadSettings()` / `saveSettings()`, `QuranTajweedSettingTab.display()`

### Adding a reciter

Add entry to `AVAILABLE_RECITERS` with `identifier`, `name`, `quranComName` (matches Quran.com CDN directory).

### Updating CSS

Edit `styles.css` only — Obsidian auto-loads it.

### Tajweed colors

Edit `TAJWEED_COLORS` in `main.js` and corresponding CSS classes in `styles.css`.

## Troubleshooting

- **Verses not loading** — Check internet connection; API at alquran.cloud must be reachable
- **Audio not playing** — Verify reciter identifier matches Quran.com CDN paths
- **Plugin not appearing** — Ensure `main.js` and `manifest.json` are in `.obsidian/plugins/quran-tajweed/`
- **Styles broken** — Check that `styles.css` exists in the plugin root directory
- **Settings changes not persisting** — Gear popover updates source file directly; if issues occur, force-close Obsidian to clear cache
