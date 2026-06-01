---
name: dive
description: Deep search web + fetch readable content
agent: build
---

Research the topic fast using this workflow: 10 result is enough 

1. Use `websearch` to find relevant links with metadata and context
2. For each promising link, use `fetch_fetch_readable` to extract clean article content
3. If needed, use alternative fetch tools:
   - `fetch_fetch_markdown` - For full page content including code
   - `fetch_fetch_html` - Unmodified HTML
   - `fetch_fetch_txt` - Plain text (strips HTML)
   - `fetch_fetch_json` - JSON files from URLs
   - `fetch_fetch_youtube_transcript` - YouTube captions/transcript
4. Summarize findings with sources and dates

Present results with:
- Key findings
- Source URLs and publication dates
- Relevance to the query

Topic to research: $ARGUMENTS