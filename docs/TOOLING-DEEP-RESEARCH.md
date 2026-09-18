# HashCode Quality — Recherche approfondie des outils open source

## 1. Objectif

Le framework ne doit pas être une collection arbitraire de linters. Il doit sélectionner les outils selon :

- stack détectée ;
- type d'application ;
- surface d'attaque ;
- criticité métier ;
- présence d'IA ;
- environnement de déploiement ;
- maturité du projet.

Le principe est **tool-per-risk**, pas **tool-per-hype**.

## 2. Socle universel

| Besoin | Outil principal | Rôle |
|---|---|---|
| Dead code JS/TS | Knip | fichiers, exports, dépendances et intégrations inutilisés |
| Lint JS/TS | ESLint | erreurs et mauvaises pratiques |
| Types JS/TS | TypeScript | cohérence statique |
| Formatage | Prettier | formatage déterministe |
| Tests unitaires | Vitest | logique applicative |
| E2E | Playwright | parcours réels |
| Architecture | dependency-cruiser | cycles et dépendances interdites |
| Duplication | jscpd | duplication détectable |
| Secrets | Gitleaks | secrets committés |
| SAST | Semgrep | patterns de sécurité et qualité |
| Vulnérabilités | Trivy / OSV-Scanner | dépendances et artefacts vulnérables |
| SBOM | Syft | inventaire logiciel |
| PR diagnostics | reviewdog | transformer les résultats des outils en commentaires/annotations CI |

Knip est particulièrement adapté à notre stratégie JS/TS car il analyse les entry points et fournit des plugins pour de nombreux frameworks, dont Next.js, Vite, Vitest et ESLint. citeturn0search7

reviewdog est utile comme couche de présentation : il peut prendre les sorties de linters/analyseurs et publier des diagnostics sur les Pull Requests, avec filtrage sur le diff. citeturn0search0

## 3. Next.js / React / TypeScript

### Contrôles

- TypeScript strict quand le projet le permet.
- ESLint et règles React/React Hooks adaptées à la version utilisée.
- Knip avec configuration spécifique au framework.
- tests unitaires des services et règles métier ; pas de snapshot partout.
- Playwright sur les parcours critiques.
- axe-core pour l'accessibilité des écrans critiques.
- Lighthouse CI pour les budgets de performance lorsque la performance web est un risque.

### Contrôles Next.js spécifiques

L'audit doit rechercher notamment :

- frontière Server Component / Client Component ;
- exposition accidentelle de données ou secrets côté client ;
- Server Actions et contrôle d'autorisation ;
- Route Handlers ;
- middleware/proxy ;
- cache et revalidation ;
- gestion des erreurs ;
- metadata et SEO si pertinent ;
- images et assets ;
- taille des bundles ;
- variables `NEXT_PUBLIC_*` ;
- accès direct aux données sans contrôle d'autorisation ;
- opérations mutantes sans validation d'entrée.

## 4. Tailwind CSS

Ne pas utiliser PurgeCSS comme mécanisme aveugle de suppression.

Le framework doit contrôler :

- classes dynamiques construites par concaténation ;
- classes impossibles à détecter statiquement ;
- duplication de styles ;
- tokens incohérents ;
- variants responsive ;
- dark mode ;
- styles arbitraires excessifs ;
- CSS global inutile ;
- dérive du design system.

PurgeCSS peut être utilisé en audit/advisory lorsqu'on sait que l'extraction des classes est fiable. Toute suppression automatique doit être interdite par défaut.

## 5. Prisma / PostgreSQL

### Prisma

Contrôler :

- `prisma validate` ;
- génération du client ;
- cohérence migrations/schema ;
- migrations destructives ;
- migrations modifiées après application ;
- relations et cardinalités ;
- index sur chemins de requêtes critiques ;
- transactions ;
- N+1 ;
- pagination ;
- opérations bulk dangereuses ;
- contrôle d'autorisation avant accès aux données.

### PostgreSQL

Pour les systèmes importants, compléter avec :

- tests d'intégration sur une vraie instance PostgreSQL ;
- vérification des contraintes ;
- index et plans sur requêtes critiques ;
- tests de concurrence lorsque nécessaire ;
- contrôle des migrations ;
- sauvegarde/restauration testée pour les systèmes critiques.

Le framework ne doit jamais considérer Prisma comme une couche d'autorisation. L'autorisation doit être vérifiée dans le service/use-case avant l'accès ou la mutation des données.

## 6. Python

Profil recommandé :

- Ruff : lint + formatage ;
- Pyright : typage statique ;
- pytest : unit/integration/regression ;
- Bandit : SAST Python ciblé ;
- Semgrep : patterns transverses ;
- OSV-Scanner ou Trivy : vulnérabilités de dépendances/artefacts.

Le framework doit détecter automatiquement `pyproject.toml`, `requirements.txt`, `uv.lock`, `poetry.lock`, etc. et choisir le gestionnaire réellement utilisé au lieu d'imposer pip.

## 7. Docker / Infrastructure

Pour les projets containerisés :

- Hadolint pour les Dockerfiles ;
- Trivy pour images et filesystem ;
- Syft pour SBOM ;
- Checkov pour Terraform/Kubernetes/IaC supporté ;
- tests de build ;
- détection de secrets dans les images ;
- contrôle utilisateur non-root lorsque pertinent ;
- contrôle des capabilities et permissions ;
- images de base maintenues ;
- versions épinglées lorsque cela réduit le risque de supply-chain.

## 8. API

Ajouter lorsque pertinent :

- contrat OpenAPI ;
- validation request/response ;
- tests de contrat ;
- tests négatifs ;
- fuzz/property testing ;
- Schemathesis pour API OpenAPI lorsque le projet s'y prête ;
- OWASP ZAP en DAST autorisé sur environnement de test.

## 9. Documentation et configuration

Un projet qualité doit aussi contrôler :

- Markdown lint ;
- liens cassés ;
- fichiers de configuration orphelins ;
- variables d'environnement documentées ;
- divergence `.env.example` / code ;
- workflows GitHub Actions ;
- YAML ;
- shell scripts avec ShellCheck ;
- Makefiles/scripts morts.

## 10. IA et agents

Un projet qui appelle un LLM doit ajouter une couche spécifique :

- golden test set ;
- tests de régression des prompts ;
- tests de prompt injection ;
- tests de tool authorization ;
- validation stricte des arguments des outils ;
- tests de data leakage ;
- tests de grounding/RAG ;
- tests d'hallucination sur assertions critiques ;
- coût/token budget ;
- latence ;
- fallback ;
- comportement en cas de timeout/rate limit ;
- versionnement du modèle et des prompts.

## 11. Code review augmentée

reviewdog doit être considéré comme une **couche de restitution**, pas comme un analyseur. Il permet d'unifier les résultats de plusieurs outils et de publier des annotations ciblées sur les changements. citeturn0search0

Pour l'analyse sémantique, un agent IA peut intervenir après les outils déterministes. Le modèle ne doit pas inventer un défaut : chaque finding doit avoir une preuve dans le dépôt, une sortie d'outil ou un test reproductible.

Les outils open source de revue assistée par IA peuvent être considérés séparément, mais ils ne remplacent ni les tests ni les analyseurs déterministes. Les comparatifs actuels du marché distinguent notamment les solutions réellement auto-hébergeables des services propriétaires. citeturn0search4

## 12. Règle de sélection

Pour chaque outil :

1. le détecteur de stack décide s'il est pertinent ;
2. le moteur de risque décide s'il est nécessaire ;
3. le runner vérifie que l'outil est installé ou l'installe dans un environnement contrôlé ;
4. le résultat est normalisé ;
5. les doublons sont regroupés ;
6. l'agent analyse le contexte ;
7. seuls les problèmes suffisamment étayés deviennent des issues.

## 13. Blocking policy

### Bloquant par défaut

- secret exposé confirmé ;
- vulnérabilité critique confirmée ;
- test requis en échec ;
- typecheck en échec ;
- build cassé ;
- migration explicitement invalide ;
- contrôle d'autorisation critique contournable et confirmé.

### Advisory par défaut

- fichier inutilisé ;
- export inutilisé ;
- dépendance inutilisée ;
- duplication ;
- dead CSS ;
- dette technique ;
- optimisation potentielle ;
- warning stylistique.

## 14. Principe essentiel

**Aucun outil ne doit supprimer automatiquement du code métier sur la seule base d'un signal statique.**

Le rôle de l'outillage est de réduire l'espace de recherche. Le rôle de l'analyse est de confirmer. Le rôle des tests est de prouver. Le rôle de l'issue est de rendre la correction actionnable.
