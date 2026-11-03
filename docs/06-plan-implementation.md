# 06 — Plan d'implémentation · Construction du MVP

Principe : on construit **par lots**. Chaque lot est **autonome, testable et donne lieu à un commit**. On ne passe au suivant qu'une fois le précédent validé. Ordre pensé pour voir quelque chose fonctionner le plus tôt possible.

---

## Lot 0 — Socle du projet
**But :** un projet qui démarre, aux bonnes couleurs.
- Initialiser Next.js (App Router, TypeScript) + Tailwind.
- Appliquer l'identité (brief 04) : police Schibsted Grotesk, tokens couleurs/rayons/halo, fond de page.
- Page d'accueil minimale + une page `/style` montrant boutons, champs, carte, badge.
- Déclarer le catalogue figé `CATALOGUE` (constante, d'après l'annexe A du PRD).
**OK si :** `npm run dev` affiche la page `/style` à la bonne identité.
**Commit :** `socle: next + tailwind + identité + catalogue`

## Lot 1 — Supabase & connexion manager
**But :** un manager peut se connecter.
- Nouveau projet Supabase ; brancher URL + clé publiable.
- Lancer les migrations `0001` → `0003` (schéma + policies + fonctions).
- Connexion par lien magique (`/connexion`, `/auth/callback`) → redirige vers `/app`.
**OK si :** je me connecte par email et j'arrive sur `/app`.
**Commit :** `auth: connexion manager (lien magique) + schéma supabase`

## Lot 2 — Sessions & tableau de bord
**But :** créer une session et obtenir un lien.
- `/app` : liste des sessions du manager + bouton **Créer une session** (titre).
- Génération d'un `share_token` + affichage du **lien de partage** (copier).
- La liste se rafraîchit immédiatement après création.
**OK si :** je crée une session, je vois son lien, elle apparaît dans la liste.
**Commit :** `sessions: création + lien de partage + tableau de bord`

## Lot 3 — Parcours collaborateur
**But :** quelqu'un remplit une carte via le lien.
- `/r/[token]` : résout le token (`public_session`), affiche l'étape identité (nom, prénom, poste, email) puis les 12 questions.
- Enregistrement via `submit_card_by_token`.
- Écran de fin : récapitulatif + **Télécharger ma carte (PDF)**.
**OK si :** j'ouvre le lien, je remplis, la carte est en base, je peux la télécharger.
**Commit :** `collaborateur: formulaire + enregistrement + téléchargement carte`

## Lot 4 — Vue d'équipe (le cœur)
**But :** le manager voit et comprend les réponses.
- `/app/session/[id]` : **tuiles** (initiales, nom, poste) → clic = carte complète.
- **Points de contraste** : questions où l'équipe diverge (≥ 2 réponses différentes), avec décompte par option.
- **Tendances par question** : barres, « % (effectif) », badge « À creuser ».
- Reproduire **exactement** la logique de l'outil de l'oncle.
**OK si :** avec 3-4 cartes, contrastes et tendances sont corrects.
**Commit :** `vue-equipe: tuiles + contrastes + tendances`

## Lot 5 — Règles d'équipe
**But :** transformer l'analyse en règles.
- `/app/session/[id]/regles` : **pistes** (chips issus des contrastes) → ajoutent une règle éditable.
- Édition libre (texte + thème), ajout/suppression, ordre.
- **Charte** = liste des règles + **Télécharger la charte (PDF)**.
**OK si :** je crée des règles depuis les pistes, je les édite, je télécharge la charte.
**Commit :** `regles: pistes + édition + charte téléchargeable`

## Lot 6 — Envoi de la carte par mail
**But :** le collaborateur reçoit sa carte.
- Brancher Resend (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`).
- Après enregistrement : envoi de la carte par mail (non bloquant si échec).
**OK si :** un mail récapitulatif arrive ; sans Resend, l'enregistrement marche quand même.
**Commit :** `mail: envoi de la carte au collaborateur (resend)`

## Lot 7 — Mise en ligne
**But :** l'outil est accessible en ligne.
- Relier le dépôt GitHub à Vercel (déploiement auto).
- Variables d'environnement sur Vercel + mise à jour des URLs Supabase.
**OK si :** l'URL publique fonctionne de bout en bout.
**Commit :** `deploy: mise en ligne vercel + variables`

---

### Règle d'or
À la fin de **chaque lot** : tester le critère « OK si », puis **commit**. Si un lot casse, on ne construit pas par-dessus — on répare d'abord. C'est ce qui évite le millefeuille.
