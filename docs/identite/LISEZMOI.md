# S'accorder — page d'accueil (handoff dev)

`index.html` : HTML statique, sans dépendance ni JavaScript. Ouvrez-le directement dans un navigateur.

## Ce qu'il contient
- Styles en ligne sur chaque élément (fidèles à la maquette). Seuls les `@keyframes`, les états `:hover` (classes `.h1`…`.h7`) et le reset `body` sont dans le `<style>` du `<head>`.
- Polices Google Fonts : **Unbounded** (titres), **Onest** (texte), **Outfit** (logotype uniquement).
- Animations CSS pures : halos (`sa-drift`), dégradé du mot « s'accorder » (`sa-flow` + `sa-glow`), points (`sa-pulse`), points lumineux (`sa-ring`). Coupées automatiquement si `prefers-reduced-motion`.

## Pour l'intégration
- Extraire les styles en ligne vers vos composants / classes ; les valeurs répétées sont les jetons ci-dessous.
- Le logo de la nav est reconstruit en HTML ; `logo-horizontal.png` est fourni si vous préférez l'image.
- Les chiffres de la maquette (6/6, 2/6, 10 questions, fil d'activité, lien d'invitation) sont des exemples.

## Jetons (mode sombre)
| Rôle | Valeur |
|---|---|
| Fond page | `#0C0E0F` |
| Surface | `#111415` / `#141718` / `#1B1F20` |
| Bordure | `rgba(255,255,255,.07–.12)` |
| Texte | `#F1F3F2` |
| Texte secondaire | `#A3ABA8` |
| Texte tertiaire | `#7D8784` |
| Accent (boutons, points) | Menthe `#58E8A8` |
| Thèmes | Bleuet `#8FA9E8` · Abricot `#F5A97F` · Lilas `#C0B0E8` · Blé `#E8D67A` |
| Verre | `rgba(255,255,255,.05)` + bordure `.1` + `backdrop-filter: blur(24px) saturate(140%)` |
| Rayons | 14 · 18 · 24 · 28 · 36 · 40 · pilule 999 |
