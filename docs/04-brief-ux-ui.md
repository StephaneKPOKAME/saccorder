# 04 — Brief UX/UI · Identité (direction sombre) & interface

Identité livrée en handoff par Stéphane (`docs/identite/`). Habillage uniquement : le fonctionnement suit le PRD.

## 0. Principe directeur — une identité, deux intensités
La même identité sombre partout, appliquée à **deux niveaux** :
- **Landing (identité pleine)** : verre, halos colorés animés, grands titres Unbounded. Pour séduire.
- **Écrans de travail / app (version calme)** : mêmes couleurs et polices, mais **surfaces solides, fort contraste, peu ou pas d'animation, verre avec parcimonie**. Pour être lisible et efficace (formulaire, résultats). ← c'est là que vit le MVP.

## 1. Polices
- **Unbounded** — titres et grands affichages (display).
- **Onest** — texte courant, interface, données. Porte l'essentiel du travail.
- **Outfit** — logotype « s'accorder » uniquement.
Dans l'app, Unbounded est **réservé aux grands titres d'écran** ; tout le reste est en Onest (Unbounded est trop lourd pour du texte dense).

## 2. Palette (mode sombre)
| Rôle | Valeur |
|---|---|
| Fond page | `#0C0E0F` |
| Surfaces | `#111415` · `#141718` · `#1B1F20` |
| Bordures | `rgba(255,255,255,.07 → .12)` |
| Texte | `#F1F3F2` |
| Texte secondaire | `#A3ABA8` |
| Texte tertiaire | `#7D8784` |
| Accent (actions, convergence) | menthe `#58E8A8` |
| Verre | `rgba(255,255,255,.05)` + bordure `.1` + `backdrop-filter: blur(24px) saturate(140%)` |

## 3. Couleurs de thème (pastels)
Bleuet `#8FA9E8` · Abricot `#F5A97F` · Lilas `#C0B0E8` · Blé `#E8D67A`.
- Servent d'**accents de section** (color-coder les 6 sections de la carte : menthe + les 4 pastels, la 6e reprend une teinte ou reste neutre).
- **Sémantique** : menthe = ce qui rassemble / positif / action ; **abricot** = point « à creuser » / contraste (le « chaud » qui attire l'œil sans être une alerte). **Pas de rouge**, pas de vert « validé ».

## 4. Formes & profondeur
- Rayons : `14 · 18 · 24 · 28 · 36 · 40 · 999` (pilules).
- Verre : réservé à la landing et, au plus, à la barre de navigation de l'app. **Pas de verre sur les cartes de contenu** (formulaire, résultats) → surfaces solides.
- Animations : halos animés = landing uniquement. Dans l'app, seulement de **légères transitions** (140–200 ms). Respecter **`prefers-reduced-motion`** (tout couper).

## 5. Deux intensités — règles concrètes
**Landing** : hero en verre, halos `sa-drift`, dégradé animé sur « s'accorder », grands titres Unbounded.
**App (écrans de travail)** :
- Fond `#0C0E0F`, cartes en surfaces solides (`#111415`/`#141718`), bordures discrètes.
- Texte `#F1F3F2` sur surface → viser un **contraste confortable** (lisibilité AA).
- Zéro halo animé ; pas de verre sur les blocs de contenu.
- Densité maîtrisée, beaucoup d'air.

## 6. Composants clés
- **Bouton primaire** : pilule claire (`#F1F3F2`, texte `#0C0E0F`) avec pastille menthe (flèche) ; hover → blanc pur. **Accent** : fond menthe `#58E8A8`, texte sombre.
- **Bouton secondaire** : contour clair (`rgba(255,255,255,.12)`), texte `#F1F3F2`.
- **Champ** : surface `#141718`, bordure `rgba(255,255,255,.1)`, texte clair, placeholder tertiaire ; focus → bordure/halo menthe léger.
- **Option (choix unique)** : non sélectionnée = surface + bordure ; sélectionnée = fond menthe `#58E8A8`, texte `#0C0E0F`.
- **Tuile personne** : initiales dans une pastille (couleur de thème), nom + poste ; cliquable.
- **Barre de tendance** : piste translucide claire, remplissage menthe (ou pastel de section), libellé « % (effectif) ».
- **Badge « À creuser »** : abricot translucide / contour abricot.
- **Logo** : diapason (reconstruit en HTML ou `logo-horizontal.png`), version claire sur fond sombre.

## 7. Règles d'interface
- Vouvoiement, sobre, **pas d'emoji**, pas de point d'exclamation.
- Tendances : **% + effectif** (ex. « 60 % (3) »).
- Avatars en **initiales**, jamais de photo.
- Lisibilité mobile indispensable (surtout le formulaire collaborateur).
- `prefers-reduced-motion` respecté partout.
