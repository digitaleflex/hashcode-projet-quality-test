# Bug → Regression Prompt

Given a confirmed defect, create the smallest test that proves the bug existed and prevents recurrence.

Process:
1. State the violated requirement or invariant.
2. Reproduce the defect using the smallest deterministic case.
3. Write a regression test that fails against the buggy behavior.
4. Implement the minimal fix.
5. Verify the regression test passes.
6. Run related tests for regressions.
7. Document root cause and affected surface.

If reproduction cannot be established, label the item as unconfirmed rather than creating a misleading test.
