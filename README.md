# Website Loek Jorna

Persoonlijke creator-site over klimmen en boulderen. Gemaakt met gewone HTML, CSS en JS, zonder build-stap. Hij draait gratis op GitHub Pages.

## Bestanden
- `index.html`: alle teksten en links
- `css/style.css`: kleuren en opmaak (kleuren pas je bovenaan aan, bij `:root`)
- `js/main.js`: je laatste reels, het mobiele menu en de animaties
- `assets/img/`: foto's

## Zelf aanpassen
- **Teksten:** zoek in `index.html` naar de tekst die je wilt veranderen en vervang hem.
- **Foto's:** zet nieuwe foto's in `assets/img/` en verwijs ernaar in `index.html`.
- **Laatste 3 reels:** plak de links van je nieuwste reels bovenaan in `js/main.js` (bij `REELS`), nieuwste eerst.

## Lokaal bekijken
```bash
python3 -m http.server 8000
```
Open daarna http://localhost:8000

## Online zetten
Push naar `main`, ga dan naar **Settings → Pages**, kies "Deploy from a branch", `main` en `/ (root)`.
