# HashCode Quality — Package npm/pnpm et CLI

## Objectif

Le framework est distribuable comme package npm et directement exécutable avec npm ou pnpm. Le dépôt reste la source de référence des prompts, profils et règles ; le package fournit l'interface d'exécution.

## Utilisation sans installation

```bash
npx hashcode-quality init
npx hashcode-quality audit
npx hashcode-quality doctor
npx hashcode-quality check --profile standard
```

Avec pnpm :

```bash
pnpm dlx hashcode-quality init
pnpm dlx hashcode-quality audit
pnpm dlx hashcode-quality doctor
pnpm dlx hashcode-quality check --profile standard
```

## Installation dans un projet

```bash
npm install --save-dev hashcode-quality
```

ou :

```bash
pnpm add -D hashcode-quality
```

Puis :

```bash
npx hashcode-quality audit
npx hashcode-quality check --profile production
```

## Commandes

| Commande | Rôle |
|---|---|
| `init` | crée une configuration locale minimale |
| `doctor` | détecte la stack et les outils disponibles |
| `audit` | produit une reconnaissance et une sélection de contrôles |
| `check` | exécute les scripts de qualité présents dans le projet |
| `prompt` | affiche un master prompt distribué avec le package |

## Profils

- `minimal` : feedback rapide pendant le développement
- `standard` : contrôle quotidien/PR
- `production` : contrôle renforcé avant mise en production
- `ai` : contrôles logiciels + qualité/sécurité des systèmes IA

## Principe d'installation

Le package ne doit pas embarquer toutes les dépendances de chaque écosystème. Il détecte la stack et recommande les outils appropriés. Cela évite d'installer Playwright, Prisma, Python tooling, Trivy ou d'autres outils lorsqu'ils ne sont pas pertinents.

Les outils externes restent installables au niveau du projet ou de l'environnement CI. Le CLI doit distinguer :

- outil disponible ;
- outil absent ;
- contrôle non applicable ;
- contrôle non vérifié.

## Publication

Avant publication publique :

1. vérifier le nom disponible sur npm ;
2. générer et committer un lockfile de développement ;
3. exécuter `npm pack --dry-run` ;
4. tester le package dans un projet vierge avec `npx` et `pnpm dlx` ;
5. vérifier que seuls `src`, `prompts`, `config`, `docs` et les métadonnées nécessaires sont publiés ;
6. publier une version semver ;
7. tester l'installation depuis le registre réel.

Le dépôt ne prétend pas avoir publié le package tant que cette étape n'a pas été exécutée sur le registre npm.
