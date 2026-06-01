# Quran Tajweed Plugin — Architecture Guide

## Overview

Obsidian plugin that renders Quranic verses with Tajweed color-coding, audio playback, translation, and transliteration. Uses Uthmanic Hafs font and fetches data from AlQuran.cloud API.

## File Structure

```
obsidian-tajweed-plugin/
├── main.js          # Plugin logic (entry point)
├── styles.css       # All UI styles (loaded automatically by Obsidian)
├── manifest.json    # Plugin metadata
├── AGENTS.md        # This file
├── data/
│   ├── quran-tajweed.json            # Pre-tagged Tajweed text data
│   ├── surahs.json                   # Surah names/metadata
│   └── translation-en-sahih.json     # English translation
└── scripts/
    └── download-quran-data.js        # Utility to fetch/update data files
```

## Architecture

### `main.js` (~850 lines) — Single-file plugin

**Entry Point:** `QuranTajweedPlugin` class (extends `Plugin`)

| Section | Lines | Description |
|---------|-------|-------------|
| Constants | 1-63 | `TAJWEED_COLORS`, `RULE_MAP`, `AVAILABLE_RECITERS`, `SURAHS` |
| `onload()` | 66-112 | Registers code block processors (`quran`, `tajweed`, `word`) and settings tab |
| Settings | 70-215 | Defaults, `loadSettings()`, `saveSettings()` |
| Parsers | 118-185 | `parseReciterFromSource()`, `parseAudioFromSource()`, `extractVerseReference()`, etc. |
| `renderQuranWithTajweed()` | 614-~760 | Main render pipeline: nav bar → check cache → fetch API → parse Tajweed → build DOM → attach audio |
| Cache helpers | 592-611 | `getCache()`, `setCache()` using `localStorage` — entire surah responses cached to avoid re-fetch |
| `parseTajweed()` | 226-238 | Converts notation like `[h:9421[ٱ]` into colored `<span>` elements |
| Audio | 239-315 | `getAudioUrl()`, `createAudioPlayer()`, `createRangePlaybackControls()`, `playRange()`, `stopRange()` |
| Settings toggle | 534-590 | `applyToggle()`, `enableAudio()`, `disableAudio()` |
| `QuranTajweedSettingTab` | ~770-940 | Settings UI (reciter, font size, defaults, etc.) |

### Data flow

```
Code block (e.g., ```quran 1:1-5```)
  → registerMarkdownCodeBlockProcessor('quran')
    → renderQuranWithTajweed()
      → extractVerseReference()  → parse "1:1-5"
      → getCache() → check localStorage for surah data
        → miss: fetch() from AlQuran.cloud API (Arabic + Translation + Transliteration)
                → setCache() → store in localStorage
        → hit: skip network entirely (0 requests)
      → parseTajweed() → regex replaces [rule[text]] with <span class="tajweed-xxx">
      → createAudioPlayer() per verse (if audio on)
      → createRangePlaybackControls() for multi-verse range (if audio on)
```

Cache key is `quran-surah-{surah}` — entire surah stored as one entry so sub-ranges within the same surah hit cache. Stored in `localStorage`.

### Tajweed notation format
The API returns text like `[h:9421[ٱ][q[ب]]` where:
- `[h:9421[ٱ]]` = rule code `h` (ham_wasl), content `ٱ`
- `[q[ب]]` = rule code `q` (qalqalah), content `ب`
- Rule codes map to colors via `RULE_MAP` → `TAJWEED_COLORS`

## Code Conventions

- **No comments** in code — keep logic self-explanatory
- **No emoji in code** — only use emoji in log messages if needed
- **CSS variables** — use Obsidian's `var(--background-primary)`, `var(--interactive-accent)`, etc. for theme compatibility
- **Classes prefixed with `quran-`** — all plugin-specific CSS classes use this prefix to avoid conflicts

## How to Make Changes

### Adding a new feature

1. Add any new CSS class rules to `styles.css` (not `main.js`)
2. Add the logic in `main.js` following the existing pattern
3. If adding a setting, add it to both:
   - The `this.settings` object in `onload()` (with default value)
   - `loadSettings()` / `saveSettings()` for persistence
   - `QuranTajweedSettingTab.display()` for the UI

### Adding a new reciter

Add an entry to the `AVAILABLE_RECITERS` array:
```js
{ identifier: 'ar.reciterid', name: 'Reciter Name', quranComName: 'ReciterName' }
```
The `quranComName` must match the Quran.com CDN directory name.

### Updating CSS

Edit `styles.css` directly — no need to touch `main.js`. Obsidian auto-loads `styles.css` from the plugin folder.

### Tajweed colors

Edit `TAJWEED_COLORS` in `main.js` and the corresponding CSS classes in `styles.css` (both `.theme-light` and `.theme-dark` variants).

## Future improvements (suggested order)

1. ~~**API response caching**~~ ✅ Done — whole surah cached in `localStorage`
2. **Audio preloading** — Preload next verse audio during range playback
3. **Replace emoji toggle icons** — Use inline SVGs (like the play/stop buttons) for cross-platform consistency
4. **Custom minimal audio player** — Replace native `<audio controls>` with a compact play-on-trigger
5. **TypeScript migration** — Convert to `.ts` with a build script for type safety
6. **Search/browse surah** — Add UI for selecting surah without typing references
7. **Multiple translations** — Support switching between different English translations

## Troubleshooting

- **Verses not loading** — Check internet connection; API at alquran.cloud must be reachable
- **Audio not playing** — Verify the reciter identifier matches Quran.com CDN paths
- **Plugin not appearing** — Ensure `main.js` and `manifest.json` are in `.obsidian/plugins/quran-tajweed/`
- **Styles broken** — Check that `styles.css` exists in the plugin root directory
