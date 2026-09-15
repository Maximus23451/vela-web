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
index.html          All markup + the inline SVG icon sprite (no emoji, no icon font)
css/style.css        Design tokens (one :root block), layout, components
js/main.js           Live release fetch — the only script on the page
assets/*.png         Real screenshots from a running debug build (chat, drawer, profile editor)
assets/og-card.html  Build input for assets/og.png — the 1200x630 social card
```

## Design language

The mark is the name. *Vela* is the real southern-sky constellation "The Sails"
(帆, *ho*) — the brightest fragment of the old Argo Navis — and the page is set like a
Japanese light-novel key visual: night-sky ink, aurora gradients, a mincho voice for
the accents, and a hanko stamp carrying 帆.

- **Dark** reads as night-sky viewing; **light** as ink on washi paper. One `:root`
  token block drives both, so retheming is a one-file edit.
- Type: [Zen Kaku Gothic New](https://fonts.google.com/specimen/Zen+Kaku+Gothic+New)
  (display + body), [Shippori Mincho B1](https://fonts.google.com/specimen/Shippori+Mincho+B1)
  (the Japanese accents), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
  (labels, code).
- Colour is one accent pair — sakura and indigo — plus gold for the stars and
  vermilion for the seal. Every text/background pair is verified at ≥4.5:1 contrast in
  both schemes.
- Motion is limited to a slow aurora drift, twinkling stars, a button sheen and
  hover lifts; all of it collapses under `prefers-reduced-motion`.
- `light-dark()` only produces **colours**. Shadows and layer opacities (`.grain`,
  `.aurora`, the title glow) go through `--shadow` / `--o-*` variables overridden per
  theme, because `opacity: light-dark(...)` is an invalid declaration that silently
  drops to `1`.

### The Japanese on the page

It is a poster signature, not decoration soup — every string is deliberate, correct,
and short. If you add more, keep it real; machine-translated filler is exactly what
makes this kind of design look cheap.

| Where | Text | Meaning |
|---|---|---|
| Hero + footer seal | 帆 | *ho* — sail (Vela = "The Sails") |
| Hero, vertical at the right edge | 帆を張れ | "set the sails" |
| Hero eyebrow, under the wordmark | はじまり · ヴェラ | beginning · Vela (katakana) |
| Section eyebrows | 理由 · 守り · 接続 · 画面 · 入手 | reason · protection · connection · screen · how to get it |
| Section watermarks | 理 · 守 · 接 · 画 · 得 | the leading character of each word above |
| Provider groups | ローカル · メッシュ · クラウド · カスタム | local · mesh · cloud · custom |

The hero constellation is a simplified rendering of Vela's own brightest stars —
γ (Regor), δ, κ (Markeb) and μ Velorum — joined into the sail shape they trace in the
sky, with a hanko-style seal standing in for the artist's signature.

## Sections and keeping them honest

`01 Why` (features) · `02 Guarded` (per-layer security breakdown) · `03 Compatibility`
(provider presets) · `04 Charted` (screenshots) · `05 Get it` (download / build).

Every claim on the page was checked against the app's source for **2.5.0**
(2026-09-15). The Security section describes exactly what ships — credentials in the
Keystore, SQLCipher database, AES-256-GCM backups and keyed exports, optional local
HTTPS with trust-on-first-use pinning, and an explicit "not end-to-end encrypted" row.
When the app changes, re-verify the affected section against the code **before** pushing
here, and don't publish a feature until the release that contains it is downloadable.
Screenshots come from the debug build (`com.vela.chat.debug`) with demo data, cropped
to the app area; never use shots showing real conversations, contacts or files.

## Local preview

No build step — just serve the folder:

```bash
python3 -m http.server 8000
```

Then check that the release data actually resolves (the download button should read
`Download v2.5.1`, not the static "Latest signed APK on GitHub releases" fallback) and
that the console is clean. `js/main.js` degrades quietly: if the GitHub API is
unreachable, the chip text falls back and the dot turns red instead of the page
breaking.

Regenerate the social card after a redesign:

```bash
brave --headless --disable-gpu --hide-scrollbars --window-size=1200,630 \
  --virtual-time-budget=9000 --screenshot=assets/og.png \
  http://localhost:8000/assets/og-card.html
```

## Hardening

Static files on GitHub Pages, so there is no server to configure — the policy travels
with the document in a `Content-Security-Policy` meta tag: `script-src 'self'` (no
inline script, no inline handlers, every value written via `textContent` / attributes),
`img-src 'self' data:`, `connect-src` limited to the GitHub API, and Google Fonts as
the only third-party origin. External links carry `rel="noopener noreferrer"`. If you
add a third-party embed, extend the policy in the same commit — and keep it tight.

## Deploy

Static files, no server-side component — `main` is served by GitHub Pages at
<https://maximus23451.github.io/vela-web/>, and the same folder works as-is on Netlify,
Cloudflare Pages, or any static host.

## License

MIT, matching the app repo.
