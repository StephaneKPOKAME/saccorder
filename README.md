# S'accorder — cartes collaboratives

Application web qui aide une équipe à mettre au clair ses façons de travailler.

Chaque collaborateur remplit une courte carte de préférences ; l'outil fait ressortir **ce qui rassemble** et **ce qui diverge** dans l'équipe, puis aide le manager à formaliser des **règles d'équipe** partagées.

## Fonctionnalités

- Connexion du manager par lien magique (e-mail)
- Création d'une session et d'un lien de partage pour l'équipe
- Parcours collaborateur sans compte : identité, 12 questions, récapitulatif téléchargeable
- Vue d'équipe : cartes individuelles, points de contraste et tendances par question
- Règles d'équipe : pistes proposées à partir des contrastes, édition libre, charte téléchargeable
- Données protégées par des règles d'accès au niveau de la base (Row Level Security)

## Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS
- Supabase : PostgreSQL, authentification, RLS

## Lancer le projet

```bash
cp .env.example .env.local   # renseigner l'URL et la clé publique Supabase
npm install
npm run dev
```

## Documentation

Le dossier [`docs/`](docs) décrit le produit (PRD), les choix techniques, le parcours utilisateur, le schéma de la base et le plan d'implémentation.

---

Projet conçu et développé par Stéphane Kpokame.
