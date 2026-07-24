# La Confrérie Portal

Première fondation visuelle du portail officiel de **La Confrérie**.

## État actuel

Cette version contient :

- une page d'accueil responsive ;
- une section événements ;
- une présentation de la guilde ;
- une galerie prête à recevoir des captures ;
- une section recrutement ;
- un emplacement pour la future connexion Discord ;
- un blason original en SVG ;
- une interface lisible sur ordinateur et téléphone.

Le bot Discord existant n'est pas modifié.

## Tester sur son ordinateur

Ouvrir simplement `index.html` dans un navigateur.

## Mettre en ligne gratuitement avec GitHub Pages

1. Envoyer tous les fichiers dans le dépôt `LaConfreriePortal`.
2. Ouvrir **Settings** → **Pages**.
3. Dans **Build and deployment**, choisir **Deploy from a branch**.
4. Sélectionner la branche `main` et le dossier `/ (root)`.
5. Enregistrer.

L'adresse gratuite apparaîtra dans la page GitHub Pages.

## Prochaine étape

Ajouter un petit backend séparé pour :

- la connexion Discord OAuth2 ;
- les événements réels ;
- la synchronisation avec le bot ;
- PostgreSQL.

Cette première version utilise uniquement HTML, CSS et JavaScript, donc elle est gratuite, légère et sans dépendance.
