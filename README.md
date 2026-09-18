# HashCode Project Quality Test

## Universal Quality Engineering Framework

This repository is the reusable quality standard for HashCode / E-Flex software projects and AI-assisted development.

It is **project-agnostic**: web, mobile, backend, APIs, CLI, automation, data, AI/LLM, infrastructure and hybrid systems.

### Architecture

**Intent → Domain/System Model → Requirements → ATDD → BDD → Implementation → TDD → Integration/E2E → Security → CI/CD → Release → Observability → Feedback**

Read the full architecture in [`docs/UNIVERSAL-QUALITY-ARCHITECTURE.md`](docs/UNIVERSAL-QUALITY-ARCHITECTURE.md).

### Universal AI prompts

| Prompt | Purpose |
|---|---|
| `00-master-orchestrator.md` | Complete quality workflow and orchestration |
| `01-discovery-and-requirements.md` | Discover system and derive requirements |
| `02-bdd-atdd.md` | Acceptance criteria and behavior scenarios |
| `03-tdd-implementation.md` | Test-first implementation and regression safety |
| `04-test-strategy.md` | Risk-based test strategy |
| `05-security-review.md` | Application and AI security review |
| `06-code-audit.md` | Evidence-based engineering audit |
| `07-release-readiness.md` | Release decision based on evidence |
| `08-ai-project-evaluation.md` | AI/LLM-specific evaluation |
| `09-bug-to-regression.md` | Convert confirmed bugs into regression tests |
| `10-pr-review.md` | Pull request review |

## Operating principles

1. Evidence before conclusions.
2. Requirements before implementation when requirements are material.
3. Risk-based rigor instead of mandatory ceremony.
4. Tests validate behavior and risk, not arbitrary coverage numbers.
5. AI-generated code is never considered correct merely because it compiles.
6. Confirmed defects, risks, missing evidence and environment blockers are separate categories.
7. Every confirmed bug should gain a regression test where practical.
8. Security is part of development, not a final checkbox.
9. No destructive or unrelated changes during quality work.

## Risk levels

- **LOW:** targeted tests + basic CI.
- **MEDIUM:** unit + integration + selected E2E.
- **HIGH:** ATDD/BDD + strong unit/integration + E2E + security checks.
- **CRITICAL:** all applicable layers + independent review + rollback + production monitoring.

## Recommended AI workflow

```text
Understand
   ↓
Plan
   ↓
Specify
   ↓
Define acceptance criteria
   ↓
Design tests
   ↓
Implement
   ↓
Run tests
   ↓
Security review
   ↓
Review diff
   ↓
Release readiness
```

## Important

The framework intentionally does **not** require DDD, BDD, TDD or E2E on every change. The correct method is the smallest quality process that provides sufficient confidence for the project's risk.
