# GARAGE AUTO REPAR — site vitrine

Site statique (HTML/CSS/JS, sans framework), hébergé sur Vercel.

## Présenter les styles au client

- **`/styles.html`** : les 5 propositions côte à côte (vue ordinateur / mobile).
- **`/index.html?style=<id>`** : le site complet dans un style donné.
  Ids : `signature`, `atelier`, `clair`, `prestige`, `depannage`.
- Sur le site : bouton flottant en bas à gauche, ou touches `1` à `5`.

Toutes les variantes partagent **le même contenu** (`index.html`). Seul le CSS change.

## Structure

```
index.html              contenu unique (sémantique, JSON-LD, Open Graph)
css/base.css            structure commune, responsive, composants
css/themes/*.css        un fichier par style (couleurs, polices, mise en page)
js/main.js              menu mobile, animations
js/style-switcher.js    DÉMO : sélecteur de style
styles.html             DÉMO : page de comparaison (noindex)
images/*.webp           images optimisées (PNG d'origine gardés pour og:image)
robots.txt, sitemap.xml
```

## Passage en production (une fois le style choisi)

1. Dans `index.html`, mettre le thème choisi dans `<link id="theme-css" href="css/themes/XXX.css">`.
2. Supprimer `<script src="js/style-switcher.js">`, puis `js/style-switcher.js`, `styles.html` et les thèmes inutilisés.
3. Optionnel : remplacer l'`@import` Google Fonts en tête du thème par des `<link>` dans le `<head>` (plus rapide).

## SEO, à compléter

- [ ] Nom de domaine définitif : `canonical`, `og:url`, `og:image`, JSON-LD, `robots.txt`, `sitemap.xml` (repère `TODO prod`).
- [ ] **Vrai numéro de téléphone** (03 84 00 00 00 est un exemple), à remplacer partout (`tel:` et JSON-LD).
- [ ] Adresse postale complète + coordonnées GPS exactes (JSON-LD + section contact).
- [ ] SIRET (pied de page), mentions légales, politique de confidentialité.
- [ ] Fiche Google Business Profile, puis lien dans `sameAs` du JSON-LD.
- [ ] Plus tard : une page par service et par ville principale (Lons, Poligny, Champagnole…) pour le référencement local.
