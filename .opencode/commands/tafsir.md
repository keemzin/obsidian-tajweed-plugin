---
name: tafsir
description: Full tafsir breakdown with word-by-word, dual tafsir (Ibn Kathir + Ma'arif-ul-Quran), and memorization guide via Quran.com API
agent: plan
---

Fetch detailed Quran tafsir analysis for verse $ARGUMENTS using this workflow:

## Input
$ARGUMENTS - Verse reference in one of:
- `chapter:verse` (e.g., `55:66`)
- `surah_name verse` (e.g., `Ar-Rahman 66`, case-insensitive)

## Steps

### 1. Parse Input

Extract `chapter` and `verse`:
- If input matches `^\d+:\d+$`, split on `:`.
- If it has a surah name, normalize and map:
  - `ar-rahman`/`rahman`/`ar rahman` → 55
  - `al-fatihah`/`fatihah` → 1
  - `al-baqarah`/`baqarah` → 2
  - `ya-sin`/`yasin` → 36
  - `al-mulk`/`mulk` → 67
  - `al-kahf`/`kahf` → 18
  - `muhammad` → 47
  - `al-waqi'ah`/`waqi'ah`/`waqiah` → 56
  - `al-muzzammil`/`muzzammil` → 73
  - `al-insan`/`insan`/`ad-dahr`/`dahr` → 76
  - Add more as needed (map against a known list of 114 surahs)
- If invalid, return error.

### 2. Fetch Verse Data via Quran.com API

```bash
Invoke-RestMethod -Uri "https://api.quran.com/api/v4/chapters/${chapter}" | ConvertTo-Json -Depth 1
Invoke-RestMethod -Uri "https://api.quran.com/api/v4/verses/by_key/${chapter}:${verse}?words=true&word_translation_language=en&translations=20,33" | ConvertTo-Json -Depth 5
```

Extract:
- **Surah name**: from chapter API (romanized + translated)
- **Translation (English)**: `verse.translations` where `resource_id=20` (Dr. Mustafa Khattab / The Clear Quran)
- **Translation (Indonesian)**: `verse.translations` where `resource_id=33` (King Fahad Quran Complex)
- **Words**: `verse.words[]`, filter out entries where `char_type_name = "end"`
- **Transliteration**: join all word transliterations: `verse.words[].transliteration.text` (skip nulls)
- **Arabic text**: join all word texts: `verse.words[].text` (skip end markers)

### 3. Fetch Tafsir Sources

#### a. Ibn Kathir (English, Abridged) — Slug: `en-tafisr-ibn-kathir`
```bash
Invoke-RestMethod -Uri "https://api.quran.com/api/v4/tafsirs/en-tafisr-ibn-kathir/by_ayah/${chapter}:${verse}" | ConvertTo-Json -Depth 2
```
Extract `tafsir.text` (HTML). Note the verse range it covers.

#### b. Ma'arif-ul-Quran — Slug: `en-tafsir-maarif-ul-quran`
```bash
Invoke-RestMethod -Uri "https://api.quran.com/api/v4/tafsirs/en-tafsir-maarif-ul-quran/by_ayah/${chapter}:${verse}" | ConvertTo-Json -Depth 2
```
Extract `tafsir.text` (HTML). Note the verse range it covers.

### 4. Process Output

- **Strip HTML tags**: Remove all `<[^>]*>` from tafsir text.
- **Decode HTML entities**: Replace `&lt;`→`<`, `&gt;`→`>`, `&amp;`→`&`, `&#?\d+;` and `&#x?[0-9a-fA-F]+;` to proper characters.
- **Synthesize tafsir**: Combine insights from BOTH sources into a coherent explanation. Note which verses the tafsir covers if it's a group.
- **Truncate**: If tafsir text is very long (>800 words), summarize the key points relevant to the specific verse.

### 5. Output Format — EXACT TEMPLATE

```
# 🌿 Surah {Surah Name} ({Chapter:Verse}) – Tafsir Breakdown

### 📖 Arabic & Translation

**Arabic:    
```quran
audio="on"
transliteration="on"
translation="off"
{Chapter:Verse}
```  

**Transliteration (Tajweed):**      
_{full_transliteration}_

**Translation (The Clear Quran – Dr. Mustafa Khattab):**      
"{english_translation}"

**Translation (King Fahad Quran Complex – Bahasa Indonesia/Malaysia):**      
"{indonesian_translation}"

---

## 1. Word-by-Word Analysis

|Word (Arabic)|Transliteration|Translation (English)|Translation (Indonesian)|
|---|---|---|---|
|{word.text}|{word.transliteration.text}|{word.translation.text}|{indonesian_word_meaning}|

---

## 3. Memorization Guide

**A. Chunking Method:**
1. **Chunk 1** – "{chunk_1_meaning}"
2. **Chunk 2** – "{chunk_2_meaning}"
3. **Chunk 3** – "{chunk_3_meaning}"

**B. Visual Imagery:**  
{describe_vivid_imagery_for_memorization}

**C. Rhyme & Sound:**  
{describe_rhythm_and_sound_patterns}

---

## ✨ Context Note (Tafsir)  
{combine_ibn_kathir_and_maarif_insights_into_coherent_explanation}
```

### Template Rules
- **Do NOT change** the section headers, emoji, or structure.
- **Do NOT fill in placeholder text** like `{placeholder}` — replace them with actual content.
- For the word-by-word table Indonesian column: derive Indonesian meaning from the word's English meaning (translate naturally, not literally from Arabic).
- For chunking: split the Arabic + translation into 2-4 meaningful chunks (phrases/clauses, not individual words). Add brief notes.
- For visual imagery: describe a vivid mental scene that captures the verse's meaning.
- For rhyme & sound: note the phonetic patterns, repeated letters, dual endings, etc.
- For tafsir: combine both sources. Ibn Kathir typically covers broader context. Ma'arif-ul-Quran adds deeper word analysis.

### Notes
- Uses `Invoke-RestMethod` (PowerShell) for fast API fetches (no browser needed)
- Tafsirs may cover verse groups; output notes the range if applicable
- Both tafsir sources are combined into one coherent Context Note