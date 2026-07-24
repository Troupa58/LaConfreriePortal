# La Confrérie Portal — V1 propre

Cette version repart sur une architecture Next.js cohérente, séparée du bot Discord.

## Fonctions incluses

- page d'accueil Next.js ;
- connexion Discord avec Auth.js ;
- événements PostgreSQL avec Prisma ;
- roster partagé ;
- inscription et désinscription ;
- validation des identifiants ;
- contrôle d'accès côté serveur ;
- limitation de requêtes ;
- journalisation des actions sensibles ;
- en-têtes de sécurité.

## Déploiement sans casser la production

1. Créer une nouvelle branche GitHub nommée `v1-test`.
2. Vider uniquement cette branche.
3. Envoyer tout le contenu de cette archive.
4. Vérifier les variables Vercel :
   - `DATABASE_URL`
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`
   - `AUTH_SECRET`
5. Lancer d'abord un Preview Deployment.
6. Exécuter les migrations PostgreSQL avant le test :
   `npm run db:migrate`
7. Tester la connexion, le roster et la désinscription.
8. Fusionner dans `main` uniquement après validation.

## Commandes

```bash
npm install
npm run db:migrate
npm run check
npm run build
npm run dev
```

## URL Discord OAuth

Production :

`https://la-confrerie-portal.vercel.app/api/auth/callback/discord`

Pour tester une URL Preview, il faudra aussi ajouter son URL exacte dans les Redirects Discord.

## Sécurité

Ne jamais placer de vraies valeurs dans `.env.example`.
Ne jamais publier le Client Secret Discord ni `DATABASE_URL`.
