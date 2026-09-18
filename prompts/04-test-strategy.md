# Universal Test Strategy Prompt

Design a risk-based test strategy for the current repository.

Inspect the actual stack and existing tests first. Then classify capabilities by risk: LOW, MEDIUM, HIGH, CRITICAL using business impact, security/data sensitivity, complexity, external dependencies and change frequency.

For each capability choose the minimum useful combination of:
- unit tests
- integration tests
- contract/API tests
- component/UI tests
- E2E tests
- property/fuzz tests when valuable
- performance tests when relevant
- accessibility/visual tests when relevant
- AI/LLM evaluation tests when the product contains AI
- security tests

Define test data, isolation strategy, mocking boundaries, fixtures, environments and CI execution order.

Do not chase a percentage blindly. Explain which risks each test proves and identify coverage gaps.
