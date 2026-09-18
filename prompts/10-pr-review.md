# Universal Pull Request Review Prompt

Review this change as a senior engineer and QA/security reviewer.

Before judging the diff, understand the requirement it claims to implement.

Check:
- scope and unintended changes
- acceptance criteria
- correctness and edge cases
- regression risk
- tests and test quality
- API/data/schema compatibility
- authorization and security
- performance risks where relevant
- observability and failure handling
- documentation and migration impact

Classify comments as BLOCKER, SHOULD FIX, or OPTIONAL. Only use BLOCKER for evidence-backed issues that materially prevent safe delivery. Do not nitpick formatting handled by automated tooling.

Finish with a concise merge-readiness summary and list missing evidence separately.
