#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { detectStack, PROFILES } from './index.mjs';

const cwd = process.cwd();
const args = process.argv.slice(2);
const command = args[0] || 'check';
const profileArg = args.includes('--profile') ? args[args.indexOf('--profile') + 1] : 'standard';
const json = args.includes('--json');

const say = (data) => console.log(json ? JSON.stringify(data, null, 2) : data);

function toolExists(name) {
  const result = spawnSync(process.platform === 'win32' ? 'where' : 'which', [name], { stdio: 'ignore' });
  return result.status === 0;
}

function run(command, commandArgs = []) {
  const result = spawnSync(command, commandArgs, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
  return result.status ?? 1;
}

function packageManager(stack) {
  return stack.packageManager === 'unknown' ? 'npm' : stack.packageManager;
}

function projectScript(name, stack) {
  if (!existsSync(join(cwd, 'package.json'))) return false;
  try {
    const pkg = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8'));
    if (!pkg.scripts?.[name]) return false;
    return run(packageManager(stack), ['run', name]);
  } catch { return false; }
}

function init() {
  const config = `version: 1\nname: hashcode-universal-quality\nprofile: standard\n\npolicies:\n  language: fr\n  evidence_required: true\n  no_auto_delete: true\n  issue_on_confirmed_defect: true\n`;
  if (!existsSync(join(cwd, 'quality.yaml'))) writeFileSync(join(cwd, 'quality.yaml'), config);
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
  if (stack.prisma) recommendations.push('Prisma validate + tests PostgreSQL');
  if (stack.python) recommendations.push('Ruff', 'Pyright/mypy', 'pytest', 'Semgrep');
  if (stack.docker) recommendations.push('Trivy', 'Syft');
  if (stack.ai) recommendations.push('AI evaluation, prompt-injection, tool authorization, data leakage, cost/latency regression');
  recommendations.push('Gitleaks', 'Semgrep');
  const unique = [...new Set(recommendations)];
  say(json ? { stack, recommendations: unique } : `HASHCODE QUALITY AUDIT\n\nStack détectée:\n${JSON.stringify(stack, null, 2)}\n\nContrôles recommandés:\n${unique.map(x => `- ${x}`).join('\n')}`);
}

function check() {
  const profile = PROFILES[profileArg] ? profileArg : 'standard';
  const stack = detectStack(cwd);
  const failures = [];
  const scripts = ['lint', 'typecheck'];
  for (const script of scripts) {
    if (existsSync(join(cwd, 'package.json'))) {
      const code = projectScript(script, stack);
      if (code !== false && code !== 0) failures.push(script);
    }
  }
  if (profile !== 'minimal' && existsSync(join(cwd, 'package.json'))) {
    const code = projectScript('test', stack);
    if (code !== false && code !== 0) failures.push('test');
  }
  say(json ? { profile, stack, failures, status: failures.length ? 'FAIL' : 'PASS_OR_NOT_VERIFIED' } : `Profile: ${profile}\nStatut: ${failures.length ? 'FAIL' : 'PASS_OR_NOT_VERIFIED'}\n${failures.length ? `Échecs: ${failures.join(', ')}` : 'Aucun échec détecté par les scripts disponibles.'}`);
  process.exitCode = failures.length ? 1 : 0;
}

switch (command) {
  case 'init': init(); break;
  case 'doctor': doctor(); break;
  case 'audit': audit(); break;
  case 'check': check(); break;
  case 'prompt':
    console.log('Utilisez prompts/00-master-orchestrator.md ou hashcode-quality audit pour sélectionner la stratégie adaptée.');
    break;
  case '--help':
  case 'help':
    console.log('HashCode Quality CLI\n\nUsage:\n  hashcode-quality init\n  hashcode-quality doctor\n  hashcode-quality audit [--json]\n  hashcode-quality check --profile minimal|standard|production|ai [--json]\n');
    break;
  default:
    console.error(`Commande inconnue: ${command}`);
    process.exitCode = 2;
}
