# HashCode Project Quality Test

## Universal Quality Engineering Framework v2.0

Reusable, risk-based quality engineering for software and AI-assisted projects. The framework is project-agnostic: web, mobile, backend, APIs, CLI, data, AI/LLM, infrastructure and hybrid systems.

## Core philosophy

> **Tooling finds signals. Tests prove behavior. Engineering analysis finds causes. Issues make correction actionable. The final gate requires evidence.**

The framework optimizes for code that does exactly what it was created to do, does it correctly, securely and efficiently, and does not accumulate unjustified complexity.

## Quality pipeline

```text
Intent
  ↓
Reconnaissance
  ↓
Version + official documentation research
  ↓
Domain/system model
  ↓
Requirements + invariants
  ↓
Risk model
  ↓
Stack-aware tool selection
  ↓
Acceptance tests
  ↓
Minimal correct implementation
  ↓
Targeted tests
  ↓
Deep quality checks
  ↓
Security / resilience / performance
  ↓
Anti-surengineering
  ↓
Issue intelligence
  ↓
Regression verification
  ↓
Final quality gate
```

## Operating modes

| Mode | Use |
|---|---|
| FAST | Fast feedback on a small change |
| STANDARD | Normal feature/bug workflow |
| DEEP | Advanced architecture and failure-mode analysis |
| PRODUCTION | Release-critical systems |
| AI | LLM/agent-specific evaluation |

## Quality dimensions

1. Code quality
2. Test quality
3. Domain correctness
4. Data integrity
5. Architecture
6. Security
7. Resilience
8. Performance
9. Observability
10. Supply chain
11. AI quality
12. Anti-surengineering

## Master prompts

| Prompt | Purpose |
|---|---|
| `00-master-orchestrator.md` | Orchestrates the complete quality lifecycle |
| `01-discovery-and-requirements.md` | Discovery and requirements |
| `02-bdd-atdd.md` | Acceptance and behavior specifications |
| `03-tdd-implementation.md` | Test-first implementation |
| `04-test-strategy.md` | Risk-based test strategy |
| `05-security-review.md` | Security review |
| `06-code-audit.md` | Evidence-based code audit |
| `07-release-readiness.md` | Release readiness |
| `08-ai-project-evaluation.md` | AI/LLM evaluation |
| `09-bug-to-regression.md` | Bug → regression test |
| `10-pr-review.md` | Pull request review |
| `11-universal-project-audit.md` | Full repository audit |
| `12-official-documentation-research.md` | Version-aware official documentation research |
| `13-minimal-correct-implementation.md` | Minimal correct implementation |
| `14-test-intelligence.md` | Advanced risk-based testing |
| `15-domain-invariant-and-state-machine.md` | Business invariants and lifecycle testing |
| `16-resilience-concurrency-idempotency.md` | Reliability, concurrency and idempotency |
| `17-security-abuse-and-supply-chain.md` | Security abuse and supply-chain analysis |
| `18-ai-agent-evaluation.md` | AI/agent quality, safety and regression |
| `19-anti-surengineering.md` | Detect unjustified complexity |
| `20-issue-intelligence.md` | Convert verified findings into detailed French Issues |
| `21-final-quality-gate.md` | Evidence-based completion gate |
| `22-autonomous-remediation.md` | Safe autonomous remediation when authorized |

## Issue standard

Every actionable finding is written in **French** and must identify:

- localisation exacte ;
- preuve ;
- cause racine ;
- conséquence technique ;
- impact utilisateur/métier/sécurité/données/performance/disponibilité/coût/maintenance ;
- gravité et niveau de confiance ;
- solution recommandée ;
- alternatives ;
- risques de correction ;
- tests de non-régression ;
- critères d'acceptation ;
- vérification finale ;
- risque résiduel.

A tool finding is not automatically an Issue. It must be contextualized, corroborated and actionable.

## Stack-aware tooling

The framework uses a `tool-per-risk` strategy rather than installing every tool everywhere. Typical profiles include:

- **Next.js / React / TypeScript:** ESLint, TypeScript, Knip, Vitest, Playwright, dependency-cruiser, jscpd, Gitleaks, Semgrep, Trivy, axe and Lighthouse CI when relevant.
- **Tailwind CSS:** framework-native/static analysis plus safe CSS auditing; dynamic classes must be handled explicitly.
- **Prisma / PostgreSQL:** schema/migration validation, integration tests against PostgreSQL, transaction/concurrency checks and query/index analysis for critical paths.
- **Python:** Ruff, Pyright or mypy, pytest, Bandit/Semgrep and OSV/Trivy as applicable.
- **Containers/IaC:** Trivy, Syft, Checkov and Dockerfile-specific checks when relevant.
- **APIs:** OpenAPI validation, contract testing, negative/property/fuzz testing and authorized DAST when appropriate.
- **AI/LLM:** golden datasets, prompt/model regression, prompt-injection, tool authorization, data-leakage, grounding, output-schema, latency and cost evaluation.

## CI policy

Blocking controls should be limited to reliable, meaningful signals such as confirmed exposed secrets, critical vulnerabilities, required test failures, broken builds or confirmed critical authorization failures. Unused code, duplication, dead CSS and similar signals begin as advisory unless project-specific evidence justifies a gate.

## Anti-surengineering rule

Do not create an issue because code could be stylistically cleaner. Complexity becomes a quality finding when evidence shows unnecessary cost, risk, duplication, coupling or maintenance burden, or when it violates an explicit architectural/domain constraint.

## Documentation

- `docs/UNIVERSAL-QUALITY-ARCHITECTURE.md` — framework architecture
- `docs/OPEN-SOURCE-TOOLCHAIN.md` — toolchain and profiles
- `docs/TOOLING-DEEP-RESEARCH.md` — tool selection rationale
- `docs/ISSUE-QUALITY-SPECIFICATION.md` — Issue contract
- `quality.yaml` — quality profiles and blocking policy

## Principle

**Correct + Simple + Testable + Secure + Maintainable + Observable + Performant + Proportionate.**
