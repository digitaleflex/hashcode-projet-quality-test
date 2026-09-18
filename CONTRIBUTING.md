# Contributing to HashCode Quality

Merci de contribuer à HashCode Quality.

## Principes

- Les changements doivent répondre à un besoin identifié ou à une amélioration démontrable.
- Préserver la philosophie **risk-based** : ne pas exécuter ou imposer des outils sans justification.
- Une alerte d'outil n'est pas automatiquement un bug : vérifier le contexte et les faux positifs.
- Toute correction de bug doit, lorsque pertinent, ajouter ou renforcer un test de non-régression.
- Éviter l'over-engineering : abstraction, dépendance ou architecture supplémentaire doit avoir une justification.
- Ne jamais introduire de secret, donnée personnelle ou credential dans le dépôt.

## Workflow

1. Fork ou branche de travail.
2. Lire le README et la documentation concernée.
3. Modifier le code et les tests nécessaires.
4. Exécuter les contrôles locaux disponibles.
5. Vérifier le diff et les effets de bord.
6. Ouvrir une Pull Request avec une description claire du problème, de la solution et des vérifications effectuées.

## Commits

Utiliser de préférence des messages de type Conventional Commits :

- `feat:` nouvelle fonctionnalité
- `fix:` correction
- `docs:` documentation
- `test:` tests
- `refactor:` refactorisation sans changement fonctionnel intentionnel
- `chore:` maintenance
- `security:` amélioration de sécurité

## Pull Requests

Une PR doit expliquer :

- pourquoi le changement est nécessaire ;
- ce qui a changé ;
- les tests exécutés ;
- les impacts et risques connus ;
- les limitations ou éléments non vérifiés.

Les modifications importantes doivent être discutées avant implémentation lorsqu'elles changent l'architecture publique, le contrat CLI ou la compatibilité.

## Signaler une vulnérabilité

Ne publiez pas de détail exploitable dans une Issue publique. Consultez `SECURITY.md`.
