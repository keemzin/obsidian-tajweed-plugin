---
name: quran-u
description: Fetch word-by-word breakdown + 1 tafsir (Ma'arif-ul-Quran) via Quran.com API. Output includes sentence-based chunking for memorization.
agent: build
---

# /quran-u

Just curl to get the result
do not build something.
do not delegates for anything
run it, look at the formatting, give me 

Fetch word-by-word breakdown + 1 tafsir (Ma'arif-ul-Quran) via Quran.com API. Output includes sentence-based chunking for memorization.

## Input
$ARGUMENTS - Verse reference in one of these formats:
- `chapter:verse` (e.g., `55:33`)
- `Surah Name verse` (e.g., `Ar-Rahman 33`, case-insensitive)

## Steps

### 1. Parse Input
Extract `chapter` (surah number) and `verse` number:
- If input matches `^\d+:\d+$`, split on `:` to get chapter/verse.
- If input contains a Surah name, map to chapter number. Supported mappings:
  - `ar-rahman` / `rahman` → 55
  - Add more mappings as needed.
- If invalid, return error requesting correct format.

### 2. Fetch Verse Data
```bash
curl -s "https://api.quran.com/api/v4/verses/by_key/${chapter}:${verse}?words=true&word_translation_language=en&translations=20,33"
```
Extract:
- Verse key: `verse.verse_key`
- Surah name: map chapter number (e.g., 55 → Ar-Rahman)
- Translation (English): `verse.translations` where `resource_id=20` (Dr. Mustafa Khattab)
- Translation (Indonesian/Malaysian): `verse.translations` where `resource_id=33` (King Fahd Quran Complex)
- Word list: `verse.words[]` (filter out `char_type_name` = "end")
- Transliteration: `verse.words[].transliteration.text` (join all words' transliterations for the full verse transliteration)

### 3. Fetch Tafsir
#### Ma'arif-ul-Quran - Slug: en-tafsir-maarif-ul-quran
```bash
curl -s "https://api.quran.com/api/v4/tafsirs/en-tafsir-maarif-ul-quran/by_ayah/${chapter}:${verse}"
```
Extract `tafsir.text` (HTML, often long).

### 4. Process Output
- **Strip HTML tags**: Remove all `<[^>]*>` tags from tafsir text.
- **Sentence-based Chunking**: Split the verse's Arabic text and translation into meaningful chunks (phrases or clauses), not individual words. Add a brief note in parentheses explaining each chunk's role.
- **Simplify**: Focus on content relevant to the target verse. Note if tafsir covers a verse group (e.g., 55:31-36). For Ma'arif-ul-Quran (longer).
- **Plain text**: No HTML/formatting, just clean text.

### 5. Output Format
#### Surah {chapter} ({surah_name}), Verse {verse}

**Arabic:**    
```quran
audio="on"
transliteration="on"
translation="off"
{chapter}:{verse}
```  

**Transliteration (Tajweed):**      
_{transliteration_text}_

**Translation (The Clear Quran – Dr. Mustafa Khattab):**      
"{translation_text}"

**Translation (King Fahad Quran Complex – Bahasa Indonesia/Malaysia):**      
"{indonesian_translation}"

---

#### Word-by-Word Analysis

| # | Arabic | Transliteration | Translation |
|---|--------|----------------|-------------|
| {position} | {word.text} | {word.transliteration.text} | {word.translation.text} |

#### Memorization Guide
**A. Chunking Method** (break translation into meaningful sentences/chunks):

1. **{arabic_chunk_1}** – "{translation_chunk_1}" ({note_1})
2. **{arabic_chunk_2}** – "{translation_chunk_2}" ({note_2})
3. **{arabic_chunk_3}** – "{translation_chunk_3}" ({note_3})

*Example for 55:33:*
1. **يَـٰمَعۡشَرَ ٱلۡجِنِّ وَٱلۡإِنسِ** – "O assembly of jinn and humans" (The challenge is issued).
2. **إِنِ ٱسۡتَطَعۡتُمۡ أَن تَنفُذُواْ مِنۡ أَقۡطَارِ ٱلسَّمَـٰوَٰتِ وَٱلۡأَرۡضِ** – "If you can pass beyond the regions of the heavens and the earth" (The impossible task).
3. **فَٱنفُذُواْۚ لَا تَنفُذُونَ إِلَّا بِسُلۡطَـٰنٍ** – "Then pass. You cannot pass except with authority" (The impossibility is confirmed).

**B. Context Note** (key takeaway from tafsir):
Summarize the core lesson in 1-2 sentences, drawing from Ma'arif-ul-Quran.

**C. Visual Imagery**:
Describe a vivid mental image that captures the verse's meaning to aid memorization. Base this on the verse content and tafsir explanations (e.g., for 55:41: imagine criminals marked by dark faces, seized by angels by their forelocks and feet).

#### Tafsir: Ma'arif-ul-Quran (Simplified)
{plain_text_tafsir}

## Notes
- Uses `curl` for fast API fetches (optimized for Ubuntu/Linux)
- The meaning and context of key terms
- Who/what is being referred to
- The connection to surrounding verses
- Spiritual and moral lessons
- Ma'arif-ul-Quran output do not over simplified. summarize not simplified
- Tafsirs may cover verse groups; output notes the range if applicable
- Add more Surah name mappings to Step1 as needed