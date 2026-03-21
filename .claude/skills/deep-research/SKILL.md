---
name: deep-research
description: Research a topic thoroughly using a forked Explore agent. Use when investigating an unfamiliar codebase area, library, or technical approach before implementing. Returns a summary to the main conversation without consuming its context.
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:

1. Search the codebase for relevant files, types, and utilities using Glob and Grep.
2. Read and analyse the most relevant files.
3. Fetch external documentation if needed.
4. Return a concise summary:
   - What exists in the codebase related to this topic
   - Key patterns and conventions in use
   - Recommended approach based on findings
   - Specific files to reference during implementation

Return the summary to the main conversation. Do not dump full file contents.
