# Quran Tajweed Plugin — Architecture Guide

## Overview

Obsidian plugin that renders Quranic verses with Tajweed color-coding, audio playback, translation, transliteration, tafsir, and word-by-word interactive study cards. Supports both standard Uthmanic Hafs text and authentic QCF V4 Madani Mushaf typography. Fetches from AlQuran.cloud API, Quran.com API v4, fawazahmed0/quran-api, and islamic.app tafsir API with local disk caching.

## File Structure

```
obsidian-tajweed-plugin/
├── main.js          # Plugin logic (entry point, ~3350 lines)
├── styles.css       # All UI styles (loaded automatically by Obsidian)
├── manifest.json    # Plugin metadata
├── AGENTS.md        # This file (Architecture & developer guide)
├── README.md        # User-facing documentation
└── data/
    ├── quran-tajweed.json            # Pre-tagged Tajweed text data
    ├── qpc-v4.json                   # QCF V4 glyph mapping data
    ├── surahs.json                   # Surah names and verse counts
    └── translation-en-sahih.json     # Bundled English translation
```

## Architecture

### `main.js` — Single-file plugin

**Entry Point:** `QuranTajweedPlugin` class (extends `Plugin`)

| Section | Description |
|---------|-------------|
| Constants | `TAJWEED_COLORS`, `V4_TAJWEED_COLORS`, `V4_RULE_NAMES`, `RULE_MAP`, `TAJWEED_DETAILS`, `AVAILABLE_RECITERS`, `SURAHS` |
| `onload()` | Registers code block processors, settings tab, commands, editor menu, palette style injection |
| Settings defaults/load/save | Manages settings with boolean defaults, storage persistence via Obsidian Plugin API |
| Parsers | `parseReciterFromSource()`, `parseAudioFromSource()`, `extractVerseReference()`, `removeParameters()` |
| `getTajweedWords()` | Deterministic scanner parsing ayah text into word objects (`html`, `raw`, `rules`) without infinite loops |
| `hasTafkhim()` | Phonetic analyzer identifying Isti'la letters, heavy Ra, and the majestic name of Allah |
| `renderStandardVerse()` | Renders standard Uthmanic Hafs text with Tajweed span coloring and word interactivity |
| `renderQulV4Verse()` | Renders authentic QCF V4 PUA glyphs with COLRv1 embedded font palettes and word interactivity |
| `showWordPopover()` | Centered/anchored card showing word transliteration, translation, audio, and Tajweed rule cards |
| `getWbwData()` | Fetches or retrieves cached word-by-word translations and pronunciations from Quran.com |
| `getSurahTafsir()` | Chapter-level tafsir fetching with caching for instant verse commentary and thematic detection |
| `createRangePlaybackControls()` | Controls bar (header `+` add button, gear settings menu, play/stop/repeat dropdown) |
| `getNextRange()` | Deterministic range calculator computing sequential verse segments across surah boundaries |
| `insertQuranBlock()` | Vault API — inserts sequential Quran blocks above or below in note with inherited settings and auto-scroll |
| `deleteQuranBlock()` | Vault API — cleanly removes targeted Quran block from note with confirmation protection |
| `updateSourceParam()` | Vault API — persists gear toggles directly to the active note without leaving Reading view |
| `updateSourceRange()` | Vault API — persists surah/verse dropdown changes to the note |
| Cache helpers | `getDiskCache()`, `setDiskCache()` using Obsidian's `Vault.adapter` for persistent storage |
| `QuranTajweedSettingTab` | Complete settings UI for fonts, layout, tafsir placement, audio, WBW, and V4 mode |

### Data Flow

```
Code block (e.g., ```quran 32:1-5```)
  → registerMarkdownCodeBlockProcessor('quran')
    → renderQuranWithTajweed()
      → extractVerseReference() → parse "32:1-5"
      → check disk cache for Arabic Tajweed text & translations
        → miss: fetch from API / bundled JSON → cache to disk
        → hit: load from disk in 0 network requests
      → if experimentalV4Tajweed:
          → load QCF V4 page font & render pre-shaped glyphs
          → attach word interactivity with Quran.com-aligned Tajweed rules & Tafkhim
      → else:
          → getTajweedWords() → build interactive words with Tajweed CSS classes
      → createRangePlaybackControls() (gear icon + range play/repeat)
      → render inline or popover Tafsir (based on settings)
```

### Word-by-Word Interactivity Flow

```
User clicks or hovers word
  → attachWordInteractivity() triggers showWordPopover()
  → getWbwData(surah, ayah) retrieves word meaning & audio from disk cache
  → rules displayed with color dots (standard or Quran.com V4 colors)
  → positionWordPopover() adjusts position ensuring it never overflows viewport
```

### Key Design Decisions

- **Deterministic Bracket Scanner**: `getTajweedWords()` uses regex matching `/^\[([a-z])(?::\d+)?\[/` guaranteeing cursor advancement on every branch, preventing infinite loops on non-rule brackets like `[ٮٰ]`.
- **Quran.com V4 Color Alignment**: `V4_TAJWEED_COLORS` and `V4_RULE_NAMES` strictly mirror the 8 categories from Quran.com's V4 Tajweed Mushaf (Silent letter, Normal madd, Separated madd, Connected madd, Necessary madd, Ghunna/ikhfa, Qalqala, Tafkhim).
- **Phonetic Tafkhim Detection**: `hasTafkhim()` identifies heavy letters (`خصضغطقظ`, heavy Ra `ر`, and `اللَّه`) while respecting Tarqiq cases (`رِ`, `فِرْعَوْن`, etc.).
- **Vault API Persistence**: Modifies active note contents in-place when using the header navigation dropdowns or gear toggles, functioning identically on desktop and mobile.
- **Thematic Tafsir Detection**: Evaluates commentary presence per verse to suppress redundant "Tafsir" buttons on verses without dedicated commentary.

## Code Conventions

- **No comments in code** — keep logic self-explanatory
- **No emoji in code** — only use emoji in user-facing UI labels if strictly required
- **CSS variables** — use Obsidian's `var(--background-primary)`, `var(--interactive-accent)`, etc.
- **Classes prefixed with `quran-`** — avoid naming collisions with Obsidian or other plugins

## How to Make Changes

### Adding a Tajweed Rule
1. Add rule mapping to `RULE_MAP` in `main.js`
2. Add descriptive metadata in `TAJWEED_DETAILS`
3. Add theme styling to `styles.css` under `.tajweed-<rule>`
4. If applicable to V4, map the rule in `V4_TAJWEED_COLORS` and `V4_RULE_NAMES`

### Updating Styles
Edit `styles.css` directly — Obsidian reloads stylesheet changes automatically.

### Adding a Reciter
Add an entry to `AVAILABLE_RECITERS` with `identifier`, `name`, and `quranComName`.
