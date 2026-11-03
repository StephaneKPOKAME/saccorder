# 04 — Brief UX/UI · Identité & interface

Identité « moderne » de S'accorder, à appliquer partout. Habillage uniquement : le fonctionnement suit le PRD.

## 1. Police
**Schibsted Grotesk** (Google Fonts), poids 400 / 500 / 600 / 700. Titres serrés, interligne compact.

## 2. Couleurs
| Rôle | Nom | Hex |
|---|---|---|
| Texte, fonds sombres | vert profond | `#004038` |
| Boutons, liens | vert | `#106048` |
| Accent (ce qui rassemble) | menthe vive | `#58E8A8` |
| Fonds d'emphase | menthe 100 / 50 | `#D8F8E8` / `#E0F8F0` |
| Texte secondaire | — | `#4A6A60` |
| Bordure | — | `#DFE7E3` |
| Gris froid | — | `#D8E0E0` |
| Étiquettes discrètes | muted | `#5D7F74` |
| Fond de page | — | `#F5F7F6` |

Pas de rouge d'alerte, pas de vert « validé ». Un point à discuter se signale par un accent **menthe** ou une étiquette « À creuser » neutre.

## 3. Formes & profondeur
- Rayons : **999** (pilules) · **28** (panneaux) · **22** (cartes) · **14** (contrôles/champs).
- Ombre unique, très douce : `0 1px 2px rgba(0,64,56,.06)`.
- **Signature visuelle** : halo menthe autour des boutons et champs actifs — `box-shadow: 0 0 0 4px rgba(88,232,168,.2)` (5px pour les gros boutons).
- Transitions : 140 ms.

## 4. Échelle typographique
- Display : 56 → 76 / 600 / -0.045em / interligne 0.98
- Titre : 28 / 600 / -0.03em
- Corps : 17 / 400 / interligne 1.6
- Étiquette : 12 / 600 / +0.16em / majuscules (muted)

## 5. Composants clés
- **Boutons** : *primaire* (fond vert profond, texte clair, pilule, halo), *secondaire* (contour), *accent* (fond menthe, texte vert profond).
- **Champs** : rayon 14, contour bordure, halo menthe au focus.
- **Choix unique (question)** : option sélectionnée = fond vert profond / texte clair ; non sélectionnée = contour.
- **Tuile personne** : initiales + nom + poste, cliquable.
- **Barre de tendance** : piste menthe 50, remplissage menthe/vert, libellé « % (effectif) ».
- **Badge** « À creuser » pour les questions sans consensus.
- **Logo** : `saccorder-logo-horizontal.png` — sur blanc, sur menthe pâle, ou en blanc sur fond vert profond.

## 6. Règles d'interface
- Vouvoiement, sobre, pas d'emoji, pas de point d'exclamation.
- Les chiffres de tendance suivent le choix de l'oncle : **% + effectif** (ex. « 60 % (3) »).
- Avatars en **initiales**, jamais de photo.
- Lisibilité mobile indispensable (formulaire collaborateur surtout).

## 7. Point ouvert (à trancher en construisant)
Couleur d'accent des **points de contraste** : rester sur la menthe/vert profond (cohérent avec l'identité) plutôt que réintroduire une teinte chaude. À valider sur le premier rendu de la vue d'équipe.
