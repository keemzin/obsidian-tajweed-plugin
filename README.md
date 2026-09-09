# Quran Tajweed Plugin for Obsidian

Display Quranic verses with beautiful Tajweed color-coding, audio playback, translation, transliteration, tafsir, and word-by-word interactive study — all inside Obsidian.

## Features

- **Tajweed Colors** — Automatic color-coding of Tajweed rules (Madd, Qalqalah, Ghunnah, Ikhfa, Idgham, Iqlab, Hamzat Wasl, Lam Shamsiyyah, and Tafkhim)
- **Word-by-Word (WBW) Interactivity** — Click or hover any word to view its Arabic text, transliteration, English meaning, pronunciation audio, and detailed Tajweed rule breakdown with color badges
- **Authentic QCF V4 Tajweed Mode** — Optional authentic King Fahd Quran Complex calligraphy with embedded COLRv1 font color palettes matching Quran.com
- **Uthmanic Hafs Font** — Traditional Mushaf calligraphy style for standard rendering
- **Audio Playback** — Per-verse audio player with range play/stop/repeat (configurable repeat counts: 1x to 30x)
- **Multi-Translation Support** — Multiple translation editions (Saheeh International, Dr. Mustafa Khattab's *The Clear Quran*, Malay, Indonesian, etc.)
- **Transliteration** — Phonetic Latin script rendering with configurable font size
- **Tafsir Study** — Ibn Kathir, Ma'arif al-Qur'an, or Tazkirul Quran; display via centered popover, inline under each verse, or both. Includes smart thematic tafsir filtering
- **Interactive Navigation** — Surah and verse range dropdowns at the top of each block with automatic source persistence
- **Quick Controls Bar** — Inline gear menu to toggle translation, transliteration, audio, and tafsir on the fly
- **Full Offline Disk Caching** — Verses, translations, word-by-word data, and page maps cached on disk for fast, offline-friendly access
- **Custom Reciters** — 13+ renowned reciters (Alafasy, Abdul Basit, Sudais, Minshawi, Husary, etc.)
- **Responsive & Mobile-Ready** — Seamless support on both desktop (Windows, macOS, Linux) and mobile (iOS, Android)

## Demos & Showcase

### 1. Insert Verse Blocks (Command Palette & Quick Dock)
<!-- Replace placeholder with your GIF file or GitHub image URL -->
<img width="360" height="800" alt="1" src="https://github.com/user-attachments/assets/56d0763d-e023-4e48-bc01-f0c4fee5f701" />


*Insert pre-configured blocks using `Ctrl+P` → "Insert Quran verse block", or use the header `+` and bottom dock icons to quickly continue sequential passages or insert starter blocks.*

---

### 2. Live Verse & Surah Navigation
<!-- Replace placeholder with your GIF file or GitHub image URL -->
<img width="360" height="800" alt="2" src="https://github.com/user-attachments/assets/a0176de2-6316-4ecc-bab9-ef7c2032f94c" />


*Switch surahs and verse ranges on the fly using interactive header dropdowns. Changes persist directly to your markdown note automatically.*

---

### 3. Word-by-Word Study & Tajweed Breakdown
<!-- Replace placeholder with your GIF file or GitHub image URL -->
<img width="360" height="800" alt="4" src="https://github.com/user-attachments/assets/81b9c6d0-a1c9-4929-a536-27495d6576a8" />


*Click or hover any word to view its English meaning, transliteration, pronunciation audio, and color-coded Tajweed rule explanation cards.*

---

### 4. 3D Side Wheel Index Scroller
<!-- Replace placeholder with your GIF file or GitHub image URL -->
<img width="360" height="800" alt="3" src="https://github.com/user-attachments/assets/1d41701f-b1b1-43e1-9bc0-ac080a91f894" />


*Effortlessly navigate long study notes with the floating 3D wheel dock. Features active verse tracking, draggable dock positioning, and smooth scroll transitions with landing pulse highlights.*

## Installation

> [!NOTE]
> Currently, the plugin is distributed for beta testing and can be installed via **BRAT (Beta Reviewer's Auto-update Tool)** or manual installation.

### Method 1: Install via BRAT (Recommended)

BRAT automates downloading, installing, and updating beta plugins directly inside Obsidian.

#### Step 1: Install BRAT from Obsidian Community Plugins
1. In Obsidian, open **Settings** (`Ctrl+,` or `Cmd+,`).
2. Select **Community plugins** from the left sidebar.
3. Ensure **Restricted mode** is turned **OFF**.
4. Click **Browse** next to Community plugins.
5. Search for **BRAT** (*Obsidian42 - BRAT* by TfTHacker).
6. Click **Install**, then click **Enable**.

#### Step 2: Add Quran Tajweed to BRAT
1. Open the Obsidian Command Palette (`Ctrl+P` on Windows/Linux or `Cmd+P` on macOS).
2. Type and select: **`BRAT: Add a beta plugin for testing`**.
3. In the repository URL prompt, enter:
   ```text
   https://github.com/keemzin/obsidian-tajweed-plugin
   ```
   *(or simply `keemzin/obsidian-tajweed-plugin`)*
4. Click **Add Plugin**. BRAT will download the latest release files and register the plugin.

#### Step 3: Enable Quran Tajweed
1. Go back to **Settings → Community plugins**.
2. Scroll down to **Installed plugins** and toggle **Quran Tajweed** **ON**.

*(BRAT will automatically check for updates and keep your plugin up to date whenever new releases are published!)*

---

### Method 2: Manual Installation

1. Download `main.js`, `styles.css`, and `manifest.json` from the latest [GitHub Release](https://github.com/keemzin/obsidian-tajweed-plugin/releases).
2. Navigate to your Obsidian vault directory and open `.obsidian/plugins/`.
3. Create a new folder named `quran-tajweed`:
   ```text
   <Your-Vault>/.obsidian/plugins/quran-tajweed/
   ```
4. Move `main.js`, `styles.css`, and `manifest.json` into that folder.
5. In Obsidian, open **Settings → Community plugins**, click **Reload plugins**, and toggle **Quran Tajweed** **ON**.

## Usage

### Basic Verse Block

````markdown
```quran
1:1
```
````

### With Audio, Translation, and Transliteration

````markdown
```quran
audio="on"
translation="on"
transliteration="on"
1:1-5
```
````

### Multi-Verse Range with Custom Reciter

````markdown
```quran
reciter="ar.abdulbasit" audio="on" translation="on"
55:1-6
```
````

### Interactive Controls

- **Navigation Header**: Quickly switch surah or verse ranges using the dropdowns — updates your note source file automatically.
- **Quick Block Creation (`+`)**: Click the `+` button in the header to either continue sequentially (`Continue below / above`) or insert a fresh starter block (`New block below / above 1:1`) so you can pick any surah and ayahs manually.
- **Continuous Reading & New Block Footer**: At the bottom of each block, click `+ Continue with Surah X:Y–Z` to keep reading, or `+ New block (1:1)` to start another passage from scratch.
- **Gear Settings & Delete**: Toggle Translation, Transliteration, and Audio on or off directly from the note, or safely remove the block via **Delete block** (with two-step confirmation).
- **Range Player**: Play the selected verse sequence with repeat loops; automatically stops other playing blocks.
- **Word-by-Word Popover**: Click or hover any word to open the study card with word pronunciation, translation, and Tajweed rule explanation.
- **Tafsir Button / Inline Tafsir**: Read thematic commentary for each verse directly in your note or in a centered modal.

### Command Palette

Press `Ctrl+P` (or `Cmd+P`) and search for:
- **"Insert Quran verse block"** — Inserts a pre-configured ` ```quran ` code block.
- **"Clear Quran Cache"** — Clears stored network caches to refresh verse data.

## Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Default Reciter** | Select from 13+ reciters (Alafasy, Abdul Basit, etc.) | Mishary Rashid Alafasy |
| **Font Size** | Slider to adjust Arabic script size | 1.8em |
| **Translation Font Size** | Slider to adjust translation text size | 0.95em |
| **Transliteration Font Size** | Slider to adjust transliteration text size | 0.85em |
| **Audio Enabled by Default** | Show audio playback controls on new blocks | `true` |
| **Translation Enabled by Default** | Show translation text by default | `true` |
| **Transliteration Enabled by Default** | Show transliteration text by default | `true` |
| **Translation Version** | Select translation edition (Saheeh Int, Clear Quran, etc.) | Saheeh International |
| **Tafsir Version** | Select tafsir edition (Ibn Kathir, Ma'arif al-Qur'an, etc.) | Ibn Kathir |
| **Tafsir Placement** | Choose where Tafsir appears (`popover`, `inline`, or `both`) | `popover` |
| **Thematic Tafsir Only** | Only show Tafsir button/text on verses where thematic commentary exists | `true` |
| **Word-by-Word (WBW)** | Enable interactive word popover cards | `true` |
| **WBW Trigger Mode** | Trigger popover on `click` or `hover` | `click` |
| **WBW Audio** | Enable pronunciation audio button in word popover | `true` |
| **Experimental QCF V4 Tajweed** | Authentic Madani Mushaf typography with COLRv1 Tajweed palette | `false` |

## Tajweed Color Guides

### Standard Mode (Uthmanic Hafs)

| Color | Rule Category | Examples |
|-------|---------------|----------|
| **Gray** | Silent Letters | Hamzatul Wasl, Lam Shamsiyyah |
| **Blue / Navy** | Madd (Prolongation) | Madd Asli (2), Madd Ja'iz (4/5), Madd Lazim (6) |
| **Red** | Qalqalah | Echoing bounce on قطب جد with sukoon |
| **Orange** | Ghunnah | 2-count nasalization on نّ and مّ |
| **Purple** | Ikhfa | Concealing Noon Sakinah or Tanween |
| **Pink** | Ikhfa Shafawi | Labial concealment of Meem Sakinah before Baa |
| **Green / Teal** | Idgham | Merging with or without Ghunnah |
| **Cyan** | Iqlab | Converting Noon Sakinah / Tanween to Meem before Baa |
| **Dark Blue** | Tafkhim | Heavy / elevated letters (خصضغطقظ, heavy Ra, Allah) |

### QCF V4 Tajweed Mode (Aligned with Quran.com)

| Color | Color Code | Quran.com Category | Scope |
|-------|------------|---------------------|-------|
| **Gray** | `#999999` | Silent letter | Unpronounced letters, Hamzatul Wasl, Lam Shamsiyyah |
| **Light Pink** | `#FFC1E0` | Normal madd (2) | Natural 2-count elongation (Madd Tabee'i / Asli) |
| **Orange** | `#FF8E3B` | Separated madd (2/4/6) | Madd Ja'iz Munfasil across words |
| **Magenta / Pink** | `#FF5E8E` | Connected madd (4/5) | Madd Wajib Muttasil within same word |
| **Red** | `#E30000` | Necessary madd (6) | Madd Lazim before sukoon / shaddah |
| **Green** | `#26B55D` | Ghunna/ikhfa | Ghunnah, Ikhfa, Idgham with Ghunnah, Iqlab |
| **Cyan** | `#00DEFF` | Qalqala (echo) | Bouncing sound on قطب جد |
| **Dark Blue** | `#3C84D5` | Tafkhim (heavy) | Full mouth pronunciation on Isti'la letters, heavy Ra, Allah |

## Credits

- **Quran Text & Tajweed**: [AlQuran.cloud](https://alquran.cloud) & [Quran.com API v4](https://quran.com)
- **Calligraphy Fonts**: King Fahd Glorious Quran Printing Complex & [fonts.quran.ws](https://fonts.quran.ws)
- **Audio CDN**: [Quran.com CDN](https://audio.qurancdn.com) & Islamic Network
- **Translations**: Saheeh International, Dr. Mustafa Khattab (*The Clear Quran*), fawazahmed0/quran-api
- **Tafsir**: [islamic.app API](https://islamic.app)
