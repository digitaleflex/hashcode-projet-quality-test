# HashCode Quality — Spécification des Issues

## Objectif

Une Issue créée par le système doit être exploitable par un développeur sans refaire l'audit.

## Chaîne de raisonnement attendue

```text
Signal
  ↓
Preuve
  ↓
Symptôme
  ↓
Cause racine
  ↓
Conséquence technique
  ↓
Impact
  ↓
Gravité justifiée
  ↓
Solution
  ↓
Étapes
  ↓
Test de non-régression
  ↓
Critères d'acceptation
```

## Les 7 questions auxquelles toute Issue doit répondre

1. **Où ?** — fichier, ligne, symbole, composant ou migration.
2. **Quoi ?** — comportement ou défaut observé.
3. **Quelle preuve ?** — outil, test, reproduction ou inspection.
4. **Pourquoi ?** — cause racine.
5. **Que se passe-t-il ?** — conséquence technique.
6. **Pourquoi est-ce important ?** — impact utilisateur/métier/sécurité/données/performance.
7. **Comment corriger ?** — solution et preuve attendue après correction.

## Anti-patterns interdits

### Mauvais

> Prisma utilise trop de requêtes.

### Bon

> `src/...` exécute une requête de récupération des utilisateurs puis une requête supplémentaire par élément dans la boucle. Avec N éléments, le chemin produit 1 + N requêtes. Sur une liste de 100 éléments, le serveur exécute donc jusqu'à 101 requêtes pour un seul affichage. La cause est l'absence de chargement relationnel/batch sur le chemin concerné. La correction doit regrouper la récupération dans une requête adaptée et ajouter un test d'intégration vérifiant le nombre de requêtes.

## Evidence policy

Chaque finding doit référencer au moins une preuve :

- chemin de fichier ;
- numéro de ligne lorsque disponible ;
- règle d'outil ;
- sortie de commande ;
- test échoué ;
- reproduction ;
- comportement observé.

Les preuves sensibles doivent être masquées. Ne jamais publier une valeur de secret dans une Issue.

## Cause vs symptôme

Le système doit préférer la cause racine.

Exemple :

```text
Symptôme : page retourne 500
        ↓
Cause immédiate : exception non gérée
        ↓
Cause racine : entrée non validée avant appel service
```

L'Issue doit traiter la cause racine lorsque celle-ci est suffisamment démontrée.

## Impact multi-dimensionnel

L'impact doit être évalué séparément :

- utilisateur ;
- métier ;
- sécurité ;
- données ;
- disponibilité ;
- performance ;
- coût ;
- maintenabilité.

Utiliser `Aucun` lorsque la dimension n'est pas concernée plutôt que d'inventer un impact.

## Issue vs simple finding

Créer une Issue lorsque le problème est :

- confirmé ;
- actionnable ;
- suffisamment localisé ;
- non déjà couvert par une Issue existante.

Créer une Issue de suivi ou un ticket d'investigation lorsque le risque est important mais que la preuve nécessite une investigation supplémentaire.

Ne pas créer d'Issue uniquement pour :

- une préférence stylistique ;
- un warning sans impact ;
- un résultat statique manifestement faux ;
- une amélioration hypothétique.

## Fermeture

Une Issue ne peut être considérée comme résolue que si :

1. le changement est présent ;
2. la cause identifiée est traitée ;
3. les tests de non-régression passent ;
4. aucune nouvelle régression pertinente n'est introduite ;
5. le résultat est vérifiable dans le dépôt/CI.
