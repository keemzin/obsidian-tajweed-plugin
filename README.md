# Quran Tajweed Plugin for Obsidian

Display Quranic verses with beautiful Tajweed color-coding, audio playback, translation, transliteration, and tafsir — all inside Obsidian.

## Features

- **Tajweed Colors** — Automatic color-coding of Tajweed rules (Madd, Qalqalah, Ghunnah, Ikhfa, Idgham, Iqlab, Hamzat Wasl, Lam Shamsiyyah)
- **Uthmanic Hafs Font** — Traditional Mushaf calligraphy style
- **Audio Playback** — Per-verse audio player with range play/stop/repeat (repeat options: 5, 10, 15, 20, 25, 30)
- **English Translation** — Multiple translation versions (Saheeh International, Dr. Mustafa Khattab, etc.)
- **Transliteration** — Latin script phonetic rendering
- **Tafsir** — Click any verse to view Tafsir Ibn Kathir or Ma'arif al-Qur'an in a centered popover
- **Interactive Navigation** — Surah and verse dropdowns at the top of each block; changes persist to source file
- **Gear Popover** — Inline toggle for Translation, Transliteration, Audio without leaving Reading view
- **Multi-verse Ranges** — Display any verse range (e.g., `2:255` or `36:1-12`)
- **Cache** — Whole-surah caching in localStorage (sub-range switches within same surah are instant)
- **Audio Preloading** — Next verse preloaded while current plays
- **Custom Reciters** — 13+ famous reciters (Alafasy, Abdul Basit, Sudais, etc.)
- **Customizable** — Font size, translation font size, transliteration font size, default reciter, default toggle states
- **Mobile Support** — Works on both desktop and mobile

## Installation

Copy `main.js`, `styles.css`, and `manifest.json` into `.obsidian/plugins/quran-tajweed/`, then enable in Settings → Community Plugins.

## Usage

### Basic verse block

````
```quran
1:1
```
````

*[Placeholder: screenshot of rendered verse]*

### With audio, translation, and transliteration

````
```quran
audio="on"
translation="on"
transliteration="on"
1:1
```
````

*[Placeholder: screenshot with controls and nav bar]*

### Multi-verse range with custom reciter

````
```quran
reciter="ar.abdulbasit" audio="on" translation="on"
55:1-6
```
````

*[Placeholder: screenshot of range with audio]*

### Interactive Controls

- **Nav bar** (top): Change surah or verse range via dropdowns — source file updates automatically
- **Gear icon** (controls bar): Toggle Translation, Transliteration, Audio on/off — persists to source
- **Play/Stop/Repeat**: Play the full verse range with configurable repeat count; cross-block safety (starting one stops another)
- **Click verse text**: Opens Tafsir popover for that verse

### Command Palette

Run **"Insert Quran verse block"** to quickly insert a template with all toggles enabled.

## Settings

| Setting | Description |
|---------|-------------|
| Default Reciter | Choose from 13+ reciters |
| Font Size | Arabic text size (slider) |
| Translation Font Size | Translation text size (slider) |
| Transliteration Font Size | Transliteration text size (slider) |
| Audio Enabled | Show audio players by default |
| Translation Enabled | Show translation by default |
| Transliteration Enabled | Show transliteration by default |
| Translation Version | Saheeh International, Dr. Mustafa Khattab, etc. |
| Tafsir Version | Ibn Kathir or Ma'arif al-Qur'an |

## Tajweed Color Guide

- **Gray** — Silent letters (Hamzat Wasl, Lam Shamsiyyah)
- **Light Blue / Blue / Dark Blue / Navy** — Madd (prolongation) rules
- **Red** — Qalqalah
- **Orange** — Ghunnah
- **Purple** — Ikhfa
- **Pink** — Ikhfa Shafawi
- **Green / Teal** — Idgham (with/without Ghunnah)
- **Cyan** — Iqlab

## Requirements

- Obsidian v0.15.0+
- Internet connection (API fetching)

## Credits

- Font: Uthmanic Hafs
- Tajweed Data: AlQuran.cloud
- Audio: Islamic Network CDN / Quran.com
- Translation: Various (AlQuran.cloud, Quran.com, fawazahmed0/quran-api)
- Tafsir: islamic.app API
