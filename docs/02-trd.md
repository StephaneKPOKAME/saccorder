# 02 — TRD · Exigences techniques — MVP

## 1. Stack
| Brique | Choix | Rôle |
|---|---|---|
| Framework / front | **Next.js (App Router) + React + TypeScript** | Pages, routage, logique serveur |
| Style | **Tailwind CSS** | Habillage, application de l'identité |
| Base de données + auth | **Supabase** (Postgres, Auth email, RLS, région UE) | Données, comptes manager, sécurité |
| Emails | **Resend** | Envoi de la carte au collaborateur |
| Hébergement | **Vercel** (déploiement auto depuis GitHub) | Mise en ligne |
| Suivi de code | **GitHub** (dépôt privé) | Historique, base du déploiement |

Tout est en **JavaScript/TypeScript de bout en bout**. Offres gratuites suffisantes pour le MVP.

## 2. Architecture (vue d'ensemble)
- Le **front Next.js** affiche les écrans et parle à Supabase.
- Les lectures/écritures sensibles passent par des **Server Components / Server Actions** (côté serveur) et par des **fonctions SQL** pour le collaborateur.
- **Supabase** stocke tout et applique la sécurité (RLS).
- **Resend** est appelé côté serveur après l'enregistrement d'une carte.

## 3. Authentification
- **Manager** : lien magique Supabase (email, sans mot de passe). Un compte = une adresse.
- **Collaborateur** : **pas d'authentification**. Il accède au formulaire via le lien de session (un *token*) et enregistre sa carte par une **fonction SQL `security definer`** qui valide le token. L'email qu'il saisit sert uniquement à lui renvoyer sa carte.

## 4. Sécurité (principe RLS)
- Le **manager** ne lit/écrit que **ses** sessions, cartes, réponses et règles.
- Le **collaborateur** ne peut **qu'ajouter sa carte** (via la fonction token) ; il ne lit aucune donnée d'équipe.
- Aucune table n'est exposée publiquement : la résolution du lien et l'enregistrement passent par des fonctions dédiées.
- Détail des policies : voir **05 — Schéma back-end**.

## 5. Emails (Resend)
- Variables : `RESEND_API_KEY`, `RESEND_FROM_EMAIL`.
- L'envoi de la carte est **optionnel et non bloquant** : si Resend n'est pas configuré ou échoue, **l'enregistrement de la carte réussit quand même** (erreur loguée côté serveur). Le téléchargement PDF reste toujours disponible.
- Expéditeur : adresse d'un domaine vérifié (ou l'adresse de test Resend en attendant).

## 6. Variables d'environnement
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...   # clé publiable, jamais la secrète
RESEND_API_KEY=re_...                               # optionnel au début
RESEND_FROM_EMAIL=...                               # optionnel au début
```
À renseigner **en local** (`.env.local`, jamais commité) **et** sur **Vercel** (Settings → Environment Variables).

## 7. Déploiement
- Dépôt GitHub privé `saccorder` relié à Vercel : chaque `push` sur `main` redéploie.
- Après tout changement d'URL : mettre à jour Supabase → Authentication → URL Configuration (Site URL + `…/auth/callback`).
- Les **migrations SQL ne se déploient pas via Vercel** : elles se lancent dans Supabase (SQL Editor).

## 8. Contraintes / non-objectifs techniques
- Pas de back-end maison, pas de serveur à gérer (tout via Supabase).
- Catalogue des 12 questions **figé dans le code** (constante), pas en base — simplicité et cohérence (voir 05).
- PDF générés via l'**impression du navigateur** (`window.print()` + `@media print`), sans dépendance lourde.
