---
name: explore
description: Deep codebase exploration using explore sub-agent
agent: build
---

Explore the codebase to answer this question using the explore sub-agent workflow:

1. Use the `task` tool with `subagent_type: "explore"` to delegate the investigation
2. Set `thoroughness` based on scope:
   - "quick" — finding specific files, patterns, or definitions
   - "medium" — understanding how a feature/component works
   - "very thorough" — tracing full logic flows, architecture analysis, cross-module dependencies
3. In the prompt, be specific about:
   - What to find (files, functions, patterns, relationships)
   - Where to look (directories, naming conventions)
   - What depth is needed
4. After the agent returns findings, synthesize the results:
   - Answer the user's question clearly
   - Reference file paths with line numbers (`file_path:line_number`)
   - Include relevant code snippets when helpful
   - Note any gaps or areas needing further investigation
5. If the explore agent cannot fully answer, follow up with direct tool calls (grep, glob, read) to fill gaps

Question to explore: $ARGUMENTS
