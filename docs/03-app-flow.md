# 03 — App Flow · Parcours utilisateurs

## Carte des écrans (routes)
```
/                      Accueil minimal → redirige vers /connexion ou /app
/connexion             Connexion manager (lien magique)
/auth/callback         Retour du lien magique
/app                   Tableau de bord manager (liste des sessions + créer)
/app/session/[id]      Vue d'équipe d'une session (tuiles, contrastes, tendances)
/app/session/[id]/regles   Règles d'équipe (pistes, édition, charte)
/r/[token]             Parcours collaborateur (formulaire public, sans compte)
```

## Parcours A — Manager
1. **/connexion** : saisit son email → reçoit un lien → clique → **/app**.
2. **/app** : voit la liste de ses sessions. Bouton **Créer une session** (titre) → une session est créée avec un **lien de partage**.
3. Il **copie le lien** et l'envoie à son équipe.
4. Quand des cartes arrivent, il ouvre **/app/session/[id]** :
   - **Tuiles** : une par personne (initiales, nom, poste) → clic = sa **carte complète**.
   - **Points de contraste** : les questions où l'équipe diverge.
   - **Tendances par question** : répartition (barres, % + effectif, badge « À creuser »).
5. Il ouvre **/app/session/[id]/regles** : des **pistes** (issues des contrastes) → il crée/édite ses **règles** → **télécharge la charte** (PDF).

### Embranchements (manager)
- Session **0 carte** → message « Aucune carte pour le moment. Partagez le lien à votre équipe. »
- **1 carte** → tuiles + tendances affichées ; contrastes possibles dès que des réponses diffèrent.

## Parcours B — Collaborateur
1. Ouvre **/r/[token]**.
2. **Étape identité** : nom, prénom, poste, email (**tous obligatoires**). Bouton *Commencer* actif seulement si tout est rempli. Mention : « Vous recevrez votre carte à cette adresse. »
3. **Étape questions** : 12 questions à choix unique (3 options), regroupées en 6 sections.
4. **Enregistrer** → la carte est sauvegardée.
5. **Écran de fin** : récapitulatif de sa carte + **Télécharger ma carte (PDF)**. En parallèle, un email avec sa carte lui est envoyé (si l'envoi est configuré).

### Embranchements (collaborateur)
- Token **invalide/inconnu** → message clair « Ce lien n'est pas valide. Demandez-en un nouveau à votre manager. »
- Champ manquant à l'étape 2 → impossible de continuer (bouton inactif).
- Échec d'envoi du mail → **n'empêche pas** l'enregistrement ni le téléchargement.

## Règle transverse
Le collaborateur **n'a jamais accès** à la vue d'équipe ni aux cartes des autres. Le manager **ne modifie pas** les cartes ; il ne fait que les **lire** et travailler les **règles**.
