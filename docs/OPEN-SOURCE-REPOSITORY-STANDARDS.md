# Open Source Repository Standards

## Objectif

Ce dépôt est public et doit être utilisable par une personne qui ne connaît ni HashCode Community ni son auteur. La documentation, les règles de contribution et les contrôles doivent donc être explicites et reproductibles.

## Community health

Le dépôt fournit les éléments attendus par GitHub pour un projet open source maintenable :

- `README.md` : présentation, installation et usage ;
- `LICENSE` : conditions juridiques ;
- `CONTRIBUTING.md` : processus de contribution ;
- `CODE_OF_CONDUCT.md` : règles communautaires ;
- `SECURITY.md` : signalement des vulnérabilités ;
- `SUPPORT.md` : orientation pour obtenir de l'aide ;
- `.github/ISSUE_TEMPLATE/` : Issues structurées ;
- `.github/PULL_REQUEST_TEMPLATE.md` : PR standardisée ;
- `.github/workflows/` : automatisation CI/CD.

## Règles techniques

1. Les changements doivent être reproductibles.
2. Les dépendances doivent être justifiées.
3. Le package publié doit contenir uniquement les fichiers nécessaires à son utilisation.
4. Aucun secret, token, fichier `.env` ou donnée privée ne doit être publié.
5. Les changements du contrat CLI doivent être documentés.
6. Les breaking changes doivent être explicitement signalés et suivre SemVer.
7. Les contrôles de qualité doivent distinguer les résultats bloquants des signaux advisory.
8. Les outils externes ne doivent être exécutés que lorsqu'ils sont pertinents pour le stack et le risque.
9. Toute automatisation de correction doit être vérifiable et ne doit pas supprimer du code sur la seule base d'un signal statique.

## Standard des Issues

Une Issue technique actionnable doit contenir, lorsque pertinent : localisation, preuve, cause racine, conséquence, impact, gravité, confiance, solution, alternatives, risques de correction, tests de non-régression, critères d'acceptation et vérification finale.

## Standard des releases

Avant une release publique :

1. mettre à jour la version ;
2. vérifier le changelog ;
3. exécuter les tests et contrôles applicables ;
4. inspecter le contenu avec `npm pack --dry-run` ;
5. tester le tarball dans un projet propre ;
6. vérifier l'installation avec npm et pnpm ;
7. publier avec provenance lorsque le pipeline de publication est configuré ;
8. tester le package depuis le registre npm après publication ;
9. créer la release GitHub correspondante.

## Gouvernance

Le projet privilégie les décisions documentées, les changements petits et réversibles, la revue par diff et la preuve avant fermeture d'une Issue. Les décisions d'architecture importantes doivent être enregistrées dans `docs/`.
