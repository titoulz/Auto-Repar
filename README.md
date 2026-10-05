# GARAGE AUTO REPAR — site vitrine

Site statique (HTML/CSS/JS, sans framework), hébergé sur Vercel.

Style retenu par le client : **Atelier** (version bleue). Les 4 autres propositions et le sélecteur de style restent consultables dans l'historique Git (commit `a737ffb`).

## Structure

```
index.html        contenu (sémantique, JSON-LD, Open Graph)
css/base.css      structure commune, responsive, composants
css/theme.css     couleurs, polices et mise en page du style Atelier
js/main.js        menu mobile, animations
images/*.webp     images optimisées (PNG d'origine gardés pour og:image)
robots.txt, sitemap.xml
```

## SEO, à compléter

- [ ] Nom de domaine définitif : `canonical`, `og:url`, `og:image`, JSON-LD, `robots.txt`, `sitemap.xml` (repère `TODO prod`).
- [ ] Adresse postale complète + coordonnées GPS exactes (JSON-LD + section contact).
- [ ] SIRET (pied de page), mentions légales, politique de confidentialité.
- [ ] Fiche Google Business Profile, puis lien dans `sameAs` du JSON-LD.
- [ ] Plus tard : une page par service et par ville principale (Lons, Poligny, Champagnole…) pour le référencement local.
