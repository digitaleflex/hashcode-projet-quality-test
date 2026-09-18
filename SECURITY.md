# Security Policy

## Versions supportées

La branche `main` et la dernière version publiée du package sont les références de sécurité prioritaires. Les anciennes versions peuvent ne plus recevoir de correctifs.

## Signaler une vulnérabilité

Ne créez pas d'Issue publique pour une vulnérabilité non corrigée et n'incluez pas de secret, credential ou preuve d'exploitation sensible dans un ticket public.

Utilisez les fonctions privées de signalement de vulnérabilité de GitHub Security Advisories lorsque cette fonctionnalité est disponible sur le dépôt. À défaut, contactez les mainteneurs via les informations de contact publiées sur le profil GitHub du projet.

Merci d'inclure :

- version concernée ;
- environnement ;
- étapes minimales de reproduction ;
- impact observé ;
- éléments permettant de reproduire le problème sans divulguer de données sensibles.

## Processus

Les mainteneurs évaluent le signalement, confirment sa reproductibilité, déterminent l'impact, corrigent le problème et documentent la résolution. Les détails sensibles sont traités avant toute divulgation publique.

## Bonnes pratiques pour les utilisateurs

- Ne placez jamais de secrets dans les fichiers de configuration suivis par Git.
- Utilisez des variables d'environnement et un gestionnaire de secrets adapté.
- Maintenez Node.js et les dépendances à jour.
- Exécutez les contrôles de sécurité dans un environnement autorisé.
