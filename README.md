# La Confrérie Portal — V0.4 fonctionnelle

## Fonctionnalités

- connexion Discord réelle avec Auth.js ;
- profil Discord visible après connexion ;
- événements stockés dans PostgreSQL ;
- roster partagé entre tous les visiteurs ;
- inscription et désinscription ;
- avatar et pseudo Discord dans le roster ;
- limite de places ;
- migrations automatiques pendant le déploiement Vercel ;
- trois événements initiaux créés automatiquement si la base est vide.

## Variables Vercel obligatoires

- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `AUTH_SECRET`
- `DATABASE_URL`

L'URL de callback Discord doit être :

`https://la-confrerie-portal.vercel.app/api/auth/callback/discord`

## Déploiement

Le script Vercel exécute automatiquement :

1. `prisma migrate deploy`
2. `prisma generate`
3. `next build`

La première compilation crée donc les tables dans PostgreSQL.

## Sécurité

Ne jamais envoyer le Client Secret Discord ou `DATABASE_URL` sur GitHub.
Ne jamais remplir `.env.example` avec les vraies valeurs.
