# HashCode Universal Open-Source Quality Toolchain

## Principle

Use a small, composable toolchain. Do not install every tool on every project. The framework selects tools by project type, risk and stack.

## Core tools

| Concern | Default tool | Purpose |
|---|---|---|
| Dead files / exports / dependencies | Knip | Finds unused files, exports, dependencies and missing/unlisted dependencies |
| Unused imports | ESLint | Local import hygiene; complementary to Knip |
| Formatting | Prettier | Deterministic formatting |
| Static analysis | ESLint + TypeScript | Code correctness and maintainability |
| Unit tests | Vitest | Fast unit/component tests |
| Browser E2E | Playwright | User-flow and regression tests |
| Architecture | dependency-cruiser | Dependency rules and forbidden cycles |
| Duplicate code | jscpd | Detects copy/paste duplication |
| CSS dead-code audit | PurgeCSS | Finds CSS selectors not present in analyzed content |
| Secrets | Gitleaks | Detects credentials and secrets in files/history |
| SAST | Semgrep | Security and correctness patterns |
| Dependencies / containers / IaC | Trivy | Vulnerabilities and misconfiguration scanning |
| SBOM | Syft | Software Bill of Materials |
| DAST | OWASP ZAP | Runtime web security checks against authorized environments |
| IaC | Checkov | Terraform/Kubernetes/CloudFormation/Docker configuration checks |
| Accessibility | axe-core / Playwright integration | Automated accessibility checks |
| Performance | Lighthouse CI | Web performance and regression budgets |

## Important decisions

### Knip is the default dependency/dead-code tool

Do not add `depcheck`, `ts-prune`, `ts-unused-exports`, or `unimported` by default. Knip covers the main use cases of these tools and is actively maintained. Use a specialized alternative only when a concrete limitation is demonstrated.

### PurgeCSS is not a universal gate

PurgeCSS is useful for CSS-heavy applications, but dynamic class names can create false positives. Run it as an audit/reporting step unless the project has a safe content extraction configuration.

### Security tools are layered

No single scanner is sufficient. Prefer Gitleaks + Semgrep + dependency/container scanning, then add ZAP/Checkov/Syft according to the architecture.

## Recommended profiles

### Web / Next.js / React / TypeScript

Knip, ESLint, TypeScript, Prettier, Vitest, Playwright, dependency-cruiser, jscpd, Gitleaks, Semgrep, Trivy, Lighthouse CI, axe.

### Backend / API

Knip, ESLint or language-native linting, unit tests, integration tests, dependency-cruiser where applicable, Gitleaks, Semgrep, Trivy, OWASP ZAP.

### Python

Ruff, mypy or pyright, pytest, pip-audit/osv-scanner, Semgrep, Gitleaks, Trivy.

### Infrastructure / Kubernetes

Trivy, Checkov, kube-linter or Kubescape, Gitleaks, Semgrep, Syft.

### AI / LLM application

All applicable software checks plus an evaluation harness for prompts/models, deterministic test cases, adversarial cases, tool-use authorization tests, data-leakage tests, prompt-injection tests, latency/cost tracking and regression datasets.

## CI policy

A tool becomes a blocking CI gate only when:

1. its signal is sufficiently reliable for the project;
2. false-positive handling is documented;
3. the team knows how to remediate findings;
4. the gate protects a meaningful production risk.

Everything else starts as an advisory report.
