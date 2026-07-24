# Architecture prévue

Le bot existant reste dans son dépôt et continue de fonctionner normalement.

```text
LaConfrerieBot (inchangé)
          │
          │ données partagées
          ▼
      PostgreSQL
          ▲
          │ API sécurisée
          │
LaConfreriePortal
```

## Règles

1. Ne pas modifier les commandes appréciées par les membres.
2. Introduire la base partagée progressivement.
3. Tester la lecture avant d'autoriser les écritures du site.
4. Utiliser l'identifiant Discord comme identifiant unique des membres.
5. Ne jamais stocker un token Discord dans le dépôt GitHub.
