# La Confrérie Portal — Next.js V0.3

Le portail est maintenant organisé comme une véritable application Next.js avec App Router et TypeScript.

## Ce qui est prêt

- page d'accueil responsive ;
- composants séparés et faciles à maintenir ;
- navigation mobile ;
- phrase d'accueil aléatoire ;
- tableau des missions ;
- présentation de la guilde ;
- galerie ;
- recrutement ;
- emplacement de connexion Discord ;
- variables d'environnement préparées ;
- bot Discord laissé intact.

## Installation locale

Il faut installer Node.js sur le PC.

```bash
npm install
npm run dev
```

Puis ouvrir :

```text
http://localhost:3000
```

## Mise en ligne recommandée

Cette version est prévue pour Vercel. Il suffira d'importer le dépôt GitHub dans Vercel. Les prochains ajouts, notamment la connexion Discord et la base de données, nécessiteront un hébergement Next.js plutôt que GitHub Pages.

## Important

Ne jamais remplir `.env.example` avec de vrais secrets. Les secrets seront ajoutés directement dans les réglages de l'hébergeur.
