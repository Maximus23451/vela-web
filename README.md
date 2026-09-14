# vela-web

Landing page for [V.E.L.A.](https://github.com/Maximus23451/vela-chat) — Versatile
Engine for Local AI, an offline-first Android chat client for LM Studio, Ollama, any
OpenAI-compatible provider, and Agent2Agent (A2A) gateways.

Deliberately vanilla HTML/CSS/JS — no framework, no build step. `js/main.js` fetches
the latest release straight from the GitHub API at load time, so the download button
always points at whatever's actually current in
[vela-chat's releases](https://github.com/Maximus23451/vela-chat/releases) without
the page itself needing an edit.

## Structure

```
index.html       All markup, inline SVG icons (no emoji, no icon font)
css/style.css     Design tokens (light + dark), layout, components
js/main.js        Live release fetch — the only script on the page
assets/           Phone-frame UI mockups, reused from the app repo's docs/mockups
```

## Local preview

No build step — just serve the folder:

```bash
python3 -m http.server 8000
```

## Design

The palette and hero graphic take their cue from the name itself: *Vela* is a real
southern-sky constellation ("The Sails," part of the old Argo Navis). Dark mode reads
as night-sky viewing; light mode reads as a printed star atlas on parchment. The hero
constellation is a simplified rendering of Vela's own brightest stars (γ, δ, κ, μ
Velorum) forming its quadrilateral sail shape.

Type: [Fraunces](https://fonts.google.com/specimen/Fraunces) (display), [IBM Plex
Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) (body), [IBM Plex
Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (labels, code).

## Deploy

Static files, no server-side component — works as-is on GitHub Pages, Netlify,
Cloudflare Pages, or any static host.

## License

MIT, matching the app repo.
