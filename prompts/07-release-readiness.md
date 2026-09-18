# Release Readiness Prompt

Determine whether the current project is ready for the requested release based only on available evidence.

Check:
- acceptance criteria
- critical tests
- integration/E2E smoke paths
- build/type/lint status
- security checks
- migrations and data compatibility
- configuration/environment requirements
- dependency changes
- rollback/recovery plan
- monitoring and alerting appropriate to the system

Return:
- READY / READY WITH CONDITIONS / NOT READY / INSUFFICIENT EVIDENCE
- blocking findings
- non-blocking findings
- exact missing evidence
- recommended release checks

Do not turn uncertainty into a PASS.
