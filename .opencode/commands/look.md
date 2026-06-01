---
name: look
description: Fast deep search web + fetch readable content (optimized with parallel fetching)
agent: build
---

Research the topic fast using this optimized workflow: 5 results is enough

1. Use `websearch` (Exa) to find relevant links with metadata and context (fast)
2. If websearch fails, fallback to `searxng_searxng_web_search`
3. **PARALLEL FETCH**: For each promising link, use `fetch_fetch_readable` simultaneously (not sequential)
   - Batch multiple `fetch_fetch_readable` calls in a single message for maximum speed
4. If needed, use alternative fetch tools:
   - `fetch_fetch_markdown` - For full page content including code
   - `fetch_fetch_html` - Unmodified HTML
   - `fetch_fetch_txt` - Plain text (strips HTML)
   - `fetch_fetch_json` - JSON files from URLs
   - `fetch_fetch_youtube_transcript` - YouTube captions/transcript
5. Summarize findings with sources and dates

Present results with:
- Key findings
- Source URLs and publication dates
- Relevance to the query

Topic to research: $ARGUMENTS