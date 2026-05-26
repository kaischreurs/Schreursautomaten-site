# Schreurs-Automaten website

Statische landingspagina voor Schreurs-Automaten (full vending service in Zuid-Holland en Utrecht).

## Inhoud

```
index.html                          Landingspagina
algemene-voorwaarden.html           AV-pagina (gelinkt vanuit de footer)
schreurs-automaten-brochure.pdf     Downloadbare brochure (gelinkt vanuit hero, nav, pricing en footer)
vercel.json                         Vercel-config (clean URLs, caching)
assets/
  css/style.css                     Stijl, responsive, dark + light secties, pricing en AV
  js/main.js                        Mobiel menu, smooth scroll, form-validatie, reveal-on-scroll
  img/                              Logo's, portret en automaat-foto's
```

## Lokaal bekijken

Open `index.html` direct in een browser, of start een eenvoudige server:

```bash
python3 -m http.server 8000
# of: npx serve .
# http://localhost:8000
```

## Hosting

**GitHub Pages**
- Repo-instellingen → Pages → branch `main` / root selecteren
- Custom domain via een `CNAME` bestand in de root (bevat alleen de domeinnaam)

**Vercel**
- Repo importeren via `vercel.com/new`, deploy is automatisch
- `vercel.json` zorgt voor schone URL's en cache-headers

## Aanpassen

- Tekst: `index.html` en `algemene-voorwaarden.html` (alles inline)
- Kleuren en stijl: bovenin `assets/css/style.css` onder `:root`
- Foto's: `assets/img/` (vervang bestand met dezelfde naam, dan is het direct vernieuwd)
- Brochure: niet in HTML aanpasbaar. Wijzigen via een nieuwe build, dezelfde bestandsnaam aanhouden

## Formulier

Het lead-formulier in de hero gebruikt `action="mailto:Schreursautomaat@gmail.com"`. Voor een betrouwbare submit-flow zonder mailclient bij de bezoeker: koppel een Formspree-endpoint of vergelijkbaar:

1. Account aanmaken op https://formspree.io
2. Nieuw form aanmaken, endpoint kopiëren
3. In `index.html` de `action` van de form `id="leadForm"` aanpassen naar de endpoint URL en `enctype` weghalen
