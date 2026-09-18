#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { detectStack, PROFILES } from './index.mjs';

const cwd = process.cwd();
const args = process.argv.slice(2);
const command = args[0] || 'check';
const profileArg = args.includes('--profile') ? args[args.indexOf('--profile') + 1] : 'standard';
const json = args.includes('--json');
const root = dirname(dirname(fileURLToPath(import.meta.url)));

function say(data) { console.log(json ? JSON.stringify(data, null, 2) : data); }
function toolExists(name) { return spawnSync(process.platform === 'win32' ? 'where' : 'which', [name], { stdio: 'ignore' }).status === 0; }
function run(commandName, commandArgs = []) { return spawnSync(commandName, commandArgs, { cwd, stdio: 'inherit', shell: process.platform === 'win32' }).status ?? 1; }
function pm(stack) { return stack.packageManager === 'unknown' ? 'npm' : stack.packageManager; }
function packageJson() { try { return JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')); } catch { return null; } }
function projectScript(name, stack) {
  const pkg = packageJson();
  if (!pkg?.scripts?.[name]) return null;
  return run(pm(stack), ['run', name]);
}

function init() {
  const config = `version: 1\nname: hashcode-universal-quality\nprofile: standard\n\npolicies:\n  language: fr\n  evidence_required: true\n  no_auto_delete: true\n  issue_on_confirmed_defect: true\n`;
  const path = join(cwd, 'quality.yaml');
  if (!existsSync(path)) writeFileSync(path, config);
  say(json ? { initialized: true, file: 'quality.yaml' } : 'HashCode Quality initialisé dans ce projet.');
}

function doctor() {
  const stack = detectStack(cwd);
  const tools = ['node', 'pnpm', 'npm', 'git', 'knip', 'eslint', 'tsc', 'vitest', 'playwright', 'gitleaks', 'semgrep', 'trivy', 'syft'];
  const result = Object.fromEntries(tools.map((tool) => [tool, toolExists(tool)]));
  say(json ? { stack, tools: result } : `${JSON.stringify(stack, null, 2)}\n\nOutils disponibles:\n${Object.entries(result).map(([k,v]) => `- ${k}: ${v ? 'OK' : 'absent'}`).join('\n')}`);
}

function audit() {
  const stack = detectStack(cwd);
  const recommendations = [];
  if (stack.nextjs || stack.react || stack.typescript) recommendations.push('Knip', 'ESLint', 'TypeScript', 'Vitest', 'Playwright');
  if (stack.tailwind) recommendations.push('Contrôles Tailwind + audit CSS advisory');
  if (stack.prisma) recommendations.push('Prisma validate + migrations + tests PostgreSQL');
  if (stack.python) recommendations.push('Ruff', 'Pyright/mypy', 'pytest', 'Semgrep');
  if (stack.docker) recommendations.push('Trivy', 'Syft');
  if (stack.kubernetes) recommendations.push('Trivy', 'Checkov');
  if (stack.ai) recommendations.push('Évaluation IA, prompt injection, autorisation outils, fuite de données, coût/latence');
  recommendations.push('Gitleaks', 'Semgrep');
  const unique = [...new Set(recommendations)];
  say(json ? { stack, recommendations: unique } : `HASHCODE QUALITY AUDIT\n\nStack détectée:\n${JSON.stringify(stack, null, 2)}\n\nContrôles recommandés:\n${unique.map(x => `- ${x}`).join('\n')}`);
}

function check() {
  const profile = PROFILES[profileArg] ? profileArg : 'standard';
  const stack = detectStack(cwd);
  const failures = [];
  for (const script of ['lint', 'typecheck']) {
    const code = projectScript(script, stack);
    if (code !== null && code !== 0) failures.push(script);
  }
  if (profile !== 'minimal') {
    const code = projectScript('test', stack);
    if (code !== null && code !== 0) failures.push('test');
  }
  say(json ? { profile, stack, failures, status: failures.length ? 'FAIL' : 'PASS_OR_NOT_VERIFIED' } : `Profile: ${profile}\nStatut: ${failures.length ? 'FAIL' : 'PASS_OR_NOT_VERIFIED'}\n${failures.length ? `Échecs: ${failures.join(', ')}` : 'Aucun échec détecté par les scripts disponibles.'}`);
  process.exitCode = failures.length ? 1 : 0;
}

function prompt() {
  const requested = args.find((arg) => arg.endsWith('.md')) || '00-master-orchestrator.md';
  const path = join(root, 'prompts', requested);
  if (!existsSync(path)) { console.error(`Prompt introuvable: ${requested}`); process.exitCode = 2; return; }
  console.log(readFileSync(path, 'utf8'));
}

switch (command) {
  case 'init': init(); break;
  case 'doctor': doctor(); break;
  case 'audit': audit(); break;
  case 'check': check(); break;
  case 'prompt': prompt(); break;
  case '--help':
  case 'help':
    console.log('HashCode Quality CLI\n\nUsage:\n  npx hashcode-quality init\n  npx hashcode-quality doctor\n  npx hashcode-quality audit [--json]\n  npx hashcode-quality check --profile minimal|standard|production|ai [--json]\n  npx hashcode-quality prompt [prompt-file.md]\n\nÉquivalent pnpm:\n  pnpm dlx hashcode-quality audit\n');
    break;
  default:
    console.error(`Commande inconnue: ${command}`);
    process.exitCode = 2;
}
