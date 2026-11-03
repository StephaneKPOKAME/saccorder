# 01 — PRD · S'accorder (Cartes collaboratives) — MVP

## 1. Vision
S'accorder aide une équipe à mettre au clair ses façons de travailler. Chaque personne remplit une courte carte de préférences ; l'outil fait ressortir **ce qui rassemble** et **ce qui diverge** ; le manager en tire des **règles d'équipe** partagées.

Le MVP reproduit **exactement** l'outil conçu par le psychologue du travail (l'oncle) : mêmes questions, même analyse, mêmes résultats — porté en ligne avec des comptes manager.

## 2. Utilisateurs
- **Manager** — crée une session, partage un lien, consulte les cartes de son équipe et l'analyse, formalise les règles. Possède un compte (connexion par email).
- **Collaborateur** — reçoit un lien, renseigne nom/prénom/poste/email, remplit la carte. Pas de compte. Reçoit sa carte par mail et peut la télécharger.

## 3. Périmètre du MVP
1. Connexion manager par email (lien magique).
2. Création d'une **session** + génération d'un **lien de partage**.
3. Tableau de bord manager : liste de ses sessions.
4. Parcours collaborateur via le lien : identité (nom, prénom, poste, email) → 12 questions → enregistrement.
5. Après remplissage : récapitulatif de la carte + **téléchargement PDF** + **envoi par mail** de la carte.
6. **Vue d'équipe** (manager) : tuiles individuelles cliquables + points de contraste + tendances par question.
7. **Règles d'équipe** : pistes proposées à partir des contrastes + édition libre + **charte téléchargeable**.

## 4. Hors périmètre (volontairement reporté)
- Site vitrine / landing commerciale, écosystème multi-outils.
- Anonymisation / agrégation avec seuil (le manager voit les réponses nominatives).
- Équipes persistantes réutilisables d'une session à l'autre.
- Notifications, boucle de mesure avant/après, statistiques avancées.
- Édition des questions par l'utilisateur (les 12 questions sont **figées**).

## 5. Règles produit
- **Confidentialité :** le manager voit **toutes les réponses, nominatives**. Le collaborateur le sait (pas de promesse d'anonymat).
- **Ton :** vouvoiement, phrases courtes, pas d'emoji, pas de point d'exclamation. Jamais « évaluation », « performance », « diagnostic ».
- **Une friction n'est pas une faute** : pas de rouge d'alerte, pas de vert « validé ».

## 6. Critères de succès du MVP
- Un manager peut, seul, créer une session, obtenir un lien, et voir une vue d'équipe correcte après ≥ 2 cartes.
- Un collaborateur remplit sa carte en < 5 min et récupère sa carte (téléchargement, et mail si configuré).
- L'analyse (contrastes + tendances) correspond **exactement** à celle de l'outil de l'oncle.

---

## Annexe A — Catalogue figé (6 sections · 12 questions · 3 options, choix unique)

**1 · Communication**
- Je préfère communiquer : `Principalement à l'écrit` / `Principalement à l'oral` / `En combinant les deux selon le contexte`
- Je préfère recevoir l'info : `Sous forme courte et synthétique` / `Avec le contexte et les détails` / `Un résumé, puis des précisions si besoin`

**2 · Implication & organisation**
- Je préfère être impliqué : `Dès le début de la réflexion` / `Pendant la construction` / `Une fois le besoin clarifié`
- Je m'organise plutôt : `En planifiant en amont` / `En m'adaptant aux priorités` / `Entre les deux`

**3 · Décision & réunion**
- Pour décider, je préfère : `Réfléchir seul avant d'échanger` / `Construire la décision à plusieurs` / `Alterner selon le sujet`
- En réunion, je préfère : `Préparer les sujets à l'avance` / `Réagir au fil des échanges` / `Adapter selon le contexte`

**4 · Feedback**
- Je préfère un feedback : `Au fil de l'eau` / `Lors d'un échange dédié` / `À un moment convenu ensemble`
- Je préfère qu'il soit : `Direct et factuel` / `Argumenté avec des exemples` / `Équilibré (points forts / axes)`

**5 · Ce qui m'agace / m'aide**
- Ce qui m'agace : `Les changements de priorité sans explication` / `Le manque de visibilité` / `Les sujets sans décision`
- Ce qui me fait gagner du temps : `Des objectifs clairs` / `Une bonne anticipation` / `Des échanges avec next steps`

**6 · À savoir sur moi**
- Une chose qui facilite le travail avec moi : `Me donner le contexte avant de solliciter mon avis` / `Clarifier les priorités et attentes` / `Faire un point régulier sur l'avancement`
- Une chose à éviter avec moi : `Les demandes de dernière minute évitables` / `Les consignes imprécises` / `Les sujets importants non explicités`
