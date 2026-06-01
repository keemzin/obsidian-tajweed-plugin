---
name: deep
description: Deep research with auto JS-heavy site detection + Playwright fallback
agent: build
---

Research the topic deeply using this workflow:

1. Use `websearch` to find relevant links with metadata and context
2. If websearch fails, fallback to `searxng_searxng_web_search`
3. For each promising link, use `fetch_fetch_readable` to extract clean article content
4. If fetch returns minimal content (empty, "Loading...", or just HTML shell with minimal text):
   - First check if it's a Next.js/SPA by looking for:
     - HTML containing "Loading..." or "Loading"
     - Large script bundles (/static/chunks/, _next/)
     - Just shell HTML with no article content
   - If detected as JS-heavy, use `playwright_browser_navigate` to load the page
   - Then use `playwright_browser_snapshot` to extract the rendered content
5. If needed, use alternative fetch tools:
   - `fetch_fetch_markdown` - For full page content including code
   - `fetch_fetch_html` - Unmodified HTML
   - `fetch_fetch_txt` - Plain text (strips HTML)
   - `fetch_fetch_json` - JSON files from URLs
   - `fetch_fetch_youtube_transcript` - YouTube captions/transcript
6. Summarize findings with sources and dates

Present results with:

- Key findings
- Source URLs and publication dates
- Relevance to the query

Topic to research: $ARGUMENTS