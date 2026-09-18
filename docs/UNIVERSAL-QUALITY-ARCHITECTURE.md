# HashCode Universal Quality Architecture v1.0

## Purpose

A project-agnostic quality engineering system for web, mobile, backend, CLI, data, AI/LLM, automation and infrastructure projects. The framework is risk-based: use only the depth justified by the project's criticality.

## Core principle

**Intent → Specification → Acceptance → Implementation → Verification → Security → Delivery → Observability → Learning**

The framework combines DDD, ATDD, BDD, TDD, integration/E2E testing, security testing, CI/CD and observability without requiring every project to implement every layer.

## Quality layers

1. **Discovery** — identify users, business goal, constraints, dependencies and risks.
2. **Domain / system model** — identify actors, entities, boundaries, invariants and important workflows. Use DDD concepts only when complexity warrants them.
3. **Requirements** — convert intent into explicit functional and non-functional requirements.
4. **Acceptance** — define measurable acceptance criteria and Definition of Done (ATDD).
5. **Behavior** — express critical user/business scenarios as Given/When/Then (BDD).
6. **Implementation** — implement the smallest change that satisfies the specification.
7. **Unit verification** — use TDD for deterministic business logic, algorithms, validation, authorization and other high-risk code.
8. **Integration verification** — validate boundaries: database, APIs, queues, external services and contracts.
9. **System/E2E verification** — validate a small set of critical user journeys.
10. **Security verification** — secrets, dependencies, authentication, authorization, input handling, API abuse cases and relevant OWASP risks.
11. **Quality gates** — lint, type-check, tests, build, security checks and policy gates in CI.
12. **Release verification** — smoke tests, migrations, rollback readiness and release evidence.
13. **Observability** — logs, metrics, traces and error monitoring appropriate to the system.
14. **Feedback** — production incidents, user feedback and defects become new requirements/tests.

## Test strategy

Use a practical pyramid:

```text
                 E2E / critical journeys
              Integration / contracts
           Unit / domain / deterministic logic
```

Prefer fast deterministic tests. Do not optimize for coverage percentage alone; optimize for meaningful risk coverage and traceability.

## Risk model

Classify each feature as **LOW / MEDIUM / HIGH / CRITICAL** using business impact, security impact, data sensitivity, complexity, external dependencies and change frequency.

- LOW: smoke + targeted unit tests.
- MEDIUM: unit + integration + selected E2E.
- HIGH: ATDD/BDD + strong unit/integration + E2E + security checks.
- CRITICAL: all applicable layers, independent review, rollback plan and production monitoring.

## Definition of Done

A feature is done only when applicable acceptance criteria pass, tests pass, security risks are addressed, documentation is updated, CI is green, and release/rollback implications are understood.

## AI-agent operating model

AI agents must never treat generated code as evidence of correctness. Every change follows:

```text
Understand → Plan → Specify → Test → Implement → Verify → Security Review → Diff Review → Report
```

The agent must distinguish **confirmed defect**, **likely risk**, **missing evidence**, and **environment blocker**. It must not invent test results or claim a command was executed when it was not.

## Universal artifacts

```text
quality/
├── PROJECT-CONTEXT.md
├── REQUIREMENTS.md
├── ACCEPTANCE.md
├── TEST-STRATEGY.md
├── SECURITY.md
├── RELEASE-READINESS.md
├── TRACEABILITY.md
├── BUGS.md
└── reports/
```

For small projects, these can be merged into one quality plan. For large projects, keep them separate.

## Adaptation rule

This is a **framework, not bureaucracy**. Start with the smallest viable quality loop and increase rigor when risk increases. Never add DDD, BDD, E2E, observability or elaborate tooling merely because the acronym exists.
