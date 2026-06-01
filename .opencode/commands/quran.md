---
name: quran
description: Get Quran verse with transliteration, translation, word-by-word, tafsir, and memorization guide
agent: build
---

Fetch detailed Quran analysis for verse $ARGUMENTS using this workflow:

1. Parse the input to get surah:verse (e.g., 55:14)
2. **Use the fetch script for fast HTML retrieval:**
   - Run: `node script/fetch_verse.cjs <surah> <ayah>`
   - This saves HTML to `fetched_verses/quranwbw_<surah>_<ayah>.html`
   - Read the saved HTML file to extract:
     - Arabic text
     - Transliteration (Simple Tajweed)
     - Translation (The Clear Quran - Mustafa Khattab)
     - Word-by-word breakdown
3. Get Bahasa Malaysia translation from King Fahad Quran Complex (if needed)
4. Fetch tafsir from quran.com:
   - Visit https://quran.com/{verse}/tafsirs/en-tafsir-maarif-ul-quran
   - Visit https://quran.com/{verse}/tafsirs/en-tafsir-ibn-kathir
5. Extract any additional word-by-word data from the saved HTML

Present results in this exact format:

# 🌿 Surah [Surah Name] ([Chapter:Verse]) – Tafsir Breakdown

### 📖 Arabic & Translation

**Arabic:**    
```quran
audio="on"
transliteration="on"
translation="off"
[Chapter:Verse]
```  

**Transliteration (Tajweed):**      
_[Transliteration text]_

**Translation (The Clear Quran – Dr. Mustafa Khattab):**      
"[English translation]"

**Translation (King Fahad Quran Complex – Bahasa Indonesia/Malaysia):**      
"[Malaysian/Indonesian translation]"

---

## 1. Word-by-Word Analysis

|Word (Arabic)|Transliteration|Translation (English)|Translation (Indonesian)|
|---|---|---|---|
|**[Arabic word]**|[transliteration]|[English meaning]|[Indonesian meaning]|

---

## 3. Memorization Guide

**A. Chunking Method:**
1. **Chunk 1** – "Meaning"
2. **Chunk 2** – "Meaning"
3. **Chunk 3** – "Meaning"

**B. Visual Imagery:**  
[Describe visual imagery for memorization]

**C. Rhyme & Sound:**  
[Describe rhythm and sound patterns]

---

## ✨ Context Note (Tafsir)  
Extract key tafsir insights from Maarif-ul-Quran and Ibn Kathir, combining them into a coherent explanation. Include:
- The meaning and context of key terms
- Who/what is being referred to
- The connection to surrounding verses
- Spiritual and moral lessons

Add relevant source citations with jina/web_scrape markers.