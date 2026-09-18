import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const PROFILES = {
  minimal: ['lint', 'typecheck', 'unit', 'dependency_hygiene'],
  standard: ['lint', 'typecheck', 'unit', 'integration', 'dependency_hygiene', 'architecture', 'secrets', 'sast'],
  production: ['lint', 'typecheck', 'unit', 'integration', 'e2e', 'dependency_hygiene', 'architecture', 'duplication', 'secrets', 'sast', 'vulnerability_scan', 'sbom', 'performance', 'accessibility', 'dast'],
  ai: ['lint', 'typecheck', 'unit', 'integration', 'e2e', 'dependency_hygiene', 'architecture', 'secrets', 'sast', 'vulnerability_scan', 'ai_evaluation', 'prompt_injection_tests', 'tool_authorization_tests', 'data_leakage_tests', 'model_regression_tests', 'cost_latency_tracking']
};

export function detectStack(cwd = process.cwd()) {
  const has = (file) => existsSync(join(cwd, file));
  let pkg = {};
  if (has('package.json')) {
    try { pkg = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')); } catch {}
  }
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  return {
    packageManager: has('pnpm-lock.yaml') ? 'pnpm' : has('yarn.lock') ? 'yarn' : has('package-lock.json') ? 'npm' : 'unknown',
    node: has('package.json'),
    typescript: has('tsconfig.json') || Boolean(deps.typescript),
    nextjs: Boolean(deps.next),
    react: Boolean(deps.react),
    tailwind: Boolean(deps.tailwindcss),
    prisma: Boolean(deps['@prisma/client'] || deps.prisma),
    vitest: Boolean(deps.vitest),
    playwright: Boolean(deps['@playwright/test']),
    python: has('pyproject.toml') || has('requirements.txt') || has('uv.lock'),
    docker: has('Dockerfile') || has('docker-compose.yml') || has('compose.yml'),
    kubernetes: has('k8s') || has('kubernetes'),
    ai: /openai|anthropic|ai-sdk|langchain|llamaindex|@google\/generative-ai/i.test(Object.keys(deps).join(' '))
  };
}

export function loadConfig(cwd = process.cwd()) {
  const path = join(cwd, 'quality.yaml');
  return existsSync(path) ? readFileSync(path, 'utf8') : null;
}
