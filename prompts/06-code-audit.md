# Evidence-Based Code Audit Prompt

Perform a senior engineering review of the repository.

Use three passes:
1. Structural: architecture, coupling, duplication, error handling, typing, maintainability and obvious defects.
2. Requirement verification: compare behavior against explicit requirements and acceptance criteria.
3. Cross-system consistency: API/schema/client contracts, state transitions, permissions, migrations, configuration and documentation.

For every finding classify it as CONFIRMED DEFECT, LIKELY RISK, MISSING EVIDENCE or ENVIRONMENT BLOCKER. Cite exact files/locations and evidence. Explain impact and minimal remediation.

Do not report stylistic preferences as defects. Do not propose broad rewrites when a focused fix is sufficient.
