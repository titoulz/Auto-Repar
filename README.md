# GARAGE AUTO REPAR — site vitrine

Site statique (HTML/CSS/JS, sans framework), hébergé sur Vercel.
Domaine : https://www.autorepar-depannage.com — tout push sur `main` est mis en ligne automatiquement.

Style retenu par le client : **Atelier** (version bleue). Les 4 autres propositions et le sélecteur de style restent consultables dans l'historique Git (commit `a737ffb`).

## Structure

```
index.html                    page d'accueil (sémantique, JSON-LD, Open Graph)
fourriere.html                démarches de sortie de fourrière (affiche client)
depannage-remorquage.html     pages services (SEO)
transport-vehicules.html
grutage.html
garage-lons-le-saunier.html
depannage-<ville>.html        pages villes (SEO) : lons-le-saunier, dole, champagnole,
                              saint-claude, poligny, morez
css/base.css                  structure commune, responsive, composants
css/theme.css                 couleurs, polices et mise en page du style Atelier
css/pages.css                 pages services et villes
css/fourriere.css             page fourrière
js/main.js                    menu mobile, animations
images/*.webp                 images optimisées (PNG d'origine gardés pour og:image)
robots.txt, sitemap.xml
```

En-tête, menu et pied de page sont **recopiés dans chaque page** : une modification
(téléphone, menu, horaires…) doit être reportée dans tous les fichiers `.html`.
Toute nouvelle page doit aussi être ajoutée à `sitemap.xml` et, si c'est un service
ou une ville, aux colonnes du pied de page.

Les pages services/villes ne sont pas dans le menu principal, volontairement :
elles sont reliées par le pied de page et la section Zones de l'accueil (liens discrets
mais visibles, à garder ; une page sans aucun lien serait vue comme une page satellite par Google).

## Checklist — à faire

### Site (peut être fait dans le code)
- [ ] **Formulaire de contact inactif** : remplacer `VOTRE_CLE_WEB3FORMS` dans `index.html` par la clé reçue sur web3forms.com (avec autorepar.lons@gmail.com).
- [ ] Médiateur de la consommation à ajouter dans `mentions-legales.html` (obligatoire pour les particuliers) + faire confirmer le n° de TVA (FR11847772951, calculé depuis le SIREN).
- [ ] `sameAs` du JSON-LD (`index.html`) : ajouter les liens de la fiche Google, Facebook, PagesJaunes une fois créés.
- [ ] Faire valider par le garage les **communes et routes citées** dans les pages villes.
- [ ] Horaires à harmoniser ? Accueil/garage : 8h-12h / 14h-18h30 ; fourrière (affiche) : 9h-12h / 14h-17h30, samedi matin sur RDV.
- [ ] Page FAQ (vraies questions clients : prix d'un dépannage, que faire après un accident, autoroute…).
- [ ] Pages services supplémentaires si utile : carrosserie, pare-brise, restauration VH (aujourd'hui regroupées dans `garage-lons-le-saunier.html`).
- [ ] Autres villes si besoin (Arbois, Orgelet, Saint-Amour, Salins, Moirans…) — avec un vrai contenu local, jamais de copier-coller.
- [ ] Publier de temps en temps une réalisation (photo + texte court).

### Hors site (comptes à créer / gérer par le garage)
- [ ] **Google Search Console** : ajouter le domaine, soumettre `https://www.autorepar-depannage.com/sitemap.xml`.
- [ ] **Fiche Google Business Profile** : catégorie « Service de dépannage automobile » + Fourrière, Garage automobile, Carrosserie, Remorquage ; mêmes nom/adresse/téléphone que le site ; horaires ; zone desservie ; photos régulières ; lien vers le site et vers `fourriere.html`.
- [ ] **Avis Google** : en demander après chaque intervention (QR code / SMS), répondre à tous.
- [ ] **Annuaires** avec des coordonnées identiques : PagesJaunes, Top Garage, Apple Business Connect, Bing Places, Facebook, mairie / CCI du Jura, assureurs partenaires.

### Fait
- [x] Domaine définitif (`autorepar-depannage.com`) dans canonical, og:url, JSON-LD, robots.txt, sitemap.
- [x] Adresse + coordonnées GPS, SIRET dans le pied de page.
- [x] Page fourrière (2026-10-15), accessible via le menu, un bandeau et la carte Fourrière.
- [x] Section Avis : lien vers les avis Google.
- [x] Mentions légales + données personnelles (`mentions-legales.html`, 2026-10-22), lien dans le pied de page de toutes les pages.
- [x] 4 pages services + 6 pages villes, liées depuis le pied de page et la section Zones (2026-10-16).
