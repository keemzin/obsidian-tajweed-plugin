# obsidian-tajweed-plugin
Display Quranic verses with beautiful Tajweed colors and Uthmanic Hafs font in Obsidian.

## Features

- 🎨 **Tajweed Colors** - Automatic color-coding of Tajweed rules
- 📖 **Uthmanic Hafs Font** - Traditional Mushaf calligraphy style
- 🔊 **Audio Playback** - Optional audio player for each verse (OFF by default)
- 📚 **English Translation** - Saheeh International translation (optional)
- 🌐 **API Integration** - Fetches verses from AlQuran.cloud
- 📱 **Mobile Support** - Works on both desktop and mobile
- ⚡ **Easy to Use** - Simple code block syntax

## Installation

### Manual Installation

1. Download the plugin files
2. Create a folder called `quran-tajweed` in your vault's `.obsidian/plugins/` directory
3. Copy `main.js` and `manifest.json` into the folder
4. Reload Obsidian
5. Enable the plugin in Settings → Community Plugins

## Usage

### Method 1: Fetch verses by reference (text only)

Use a code block with language `quran` or `tajweed`:

```quran
audio="off" transliteration="off" translation="off"  
1:1
```
<img width="817" height="94" alt="image" src="https://github.com/user-attachments/assets/8a108fa0-1ae2-497f-8b7f-5116bc15b1a0" />

This will fetch and display Surah Ar-Rahman, verses 1-6 with Tajweed colors.
**Audio is OFF by default.**

### Method 2: Single verse

```quran
audio="off" transliteration="off" translation="off"  
1:2
```
<img width="823" height="164" alt="image" src="https://github.com/user-attachments/assets/23b14b33-54f3-47bb-876f-4dcd41b19553" />

### Method 3: Enable audio playback

Add `audio="on"` to enable audio player:

```quran
audio="on" transliteration="off" translation="off"  
1:2
```
<img width="819" height="357" alt="image" src="https://github.com/user-attachments/assets/ea74aabf-c774-417a-b334-f3b6c8b33024" />

Each verse will have an audio player below it.

### Method 4: Enable English translation

Add `translation="on"` to show the Saheeh International translation:

```quran
audio="off" transliteration="off" translation="on"  
1:2
```
<img width="811" height="453" alt="image" src="https://github.com/user-attachments/assets/f53fe05b-8e6d-4526-896a-34d969bec34a" />

### Method 5: Combine audio and translation

```quran
audio="on" transliteration="on" translation="on"  
1:2
```
<img width="811" height="547" alt="image" src="https://github.com/user-attachments/assets/65a53fce-eb0e-4c9e-8938-c8f3d58ffe14" />

### Method 6: Custom reciter with audio and translation

Combine parameters as needed:

```quran
reciter="ar.abdulbasit" audio="on" translation="on"
1:1-7
```


## Settings

Go to **Settings → Community Plugins → Quran Tajweed** to:

- 🎵 **Choose your default reciter** from 10+ famous reciters
- Default: **Mishary Rashid Alafasy**

### Available Reciters:

| Reciter | Identifier |
|---------|------------|
| Mishary Rashid Alafasy | `ar.alafasy` |
| Abdul Basit (Mujawwad) | `ar.abdulbasit` |
| Abdul Samad (Murattal) | `ar.abdulsamad` |
| Mahmoud Khalil Al-Husary | `ar.husary` |
| Ali Al-Hudhaify | `ar.hudhaify` |
| Abdur-Rahman as-Sudais | `ar.sudais` |
| Saud Al-Shuraim | `ar.shuraim` |
| Maher Al Muaiqly | `ar.mahermuaiqly` |
| Ahmed ibn Ali al-Ajamy | `ar.ahmedajmy` |
| Hani ar-Rifai | `ar.hanirifai` |
| Mohamed Siddiq al-Minshawi (Mujawwad) | `ar.minshawi` |
| Mohamed Siddiq al-Minshawi (Murattal) | `ar.minshawi.murattal` |
| Mohamed al-Tablawi | `ar.tablawi` |
| Abu Bakr al-Shatri | `ar.shatri` |

**Note:** Reciters are sourced from Quran.com CDN. Saad Al Ghamdi is not available on this CDN.

## Tajweed Color Guide

- **Gray** - Silent letters (Hamzat Wasl, Lam Shamsiyyah)
- **Blue shades** - Madd (prolongation) rules
  - Light Blue: Normal Madd
  - Blue: Permissible Madd
  - Dark Blue: Obligatory Madd
  - Navy: Necessary Madd
- **Red** - Qalqalah
- **Orange** - Ghunnah
- **Purple** - Ikhfa
- **Pink** - Ikhfa Shafawi
- **Green/Teal** - Idgham (with/without Ghunnah)
- **Cyan** - Iqlab


## Requirements

- Internet connection (for fetching verses and audio from API)
- Obsidian v0.15.0 or higher

## Credits

- Font: Uthmanic Hafs from Quran Foundation
- Tajweed Data & Reciters: AlQuran.cloud API
- Audio: Islamic Network CDN
- Plugin created for educational purposes

## License

Free to use for personal and educational purposes.
