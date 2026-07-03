# Fortschritt: Version 2 & Version 3 Landingpages

Letzter Stand: 2026-07-03, Phase 3 (finale Verifikation) abgeschlossen. Alle 3 Versionen per Preview-Server (Desktop 1280px) Screenshot- und computed-style-geprüft und freigegeben. Der Verdacht "v3-Bento-Karten wirken leer wegen .reveal-Animation" wurde WIDERLEGT: nach Scroll in den Viewport haben alle 6 Karten opacity:1 (reveal--pending entfernt), Bilder/Text sichtbar. Footer-Switcher in allen 3 Versionen korrekt (Ziel-URLs + aktive Version fett/unterstrichen/Markenfarbe/aria-current). Wichtiger Test-Hinweis: `serve` normalisiert `/v3/index.html` -> `/v3` (ohne Slash), wodurch relative CSS-Pfade fälschlich gegen Root auflösen und die Blau-Tokens statt Teal geladen werden — beim Testen/Verlinken IMMER mit Trailing-Slash (`/v3/`, `/v2/`) aufrufen, dann korrekt.

Plan-Datei (Details/Begründungen): `C:\Users\Hagen\.claude\plans\graceful-cuddling-koala.md`

## Zwischenstand-Zusammenfassung (bei Wiederaufnahme zuerst lesen)

- **v1** (Root `index.html`): unverändert bis auf additiven Footer-Versions-Switcher (verifiziert per `git diff` — nur +5 Zeilen in index.html, +24 Zeilen in css/components.css, sonst nichts).
- **v2** (`v2/index.html`, rot #C71902): fertig gebaut, vom Build-Agenten selbst verifiziert (keine 404s, Chat-Widget/FAQ/Footer-Switcher funktional getestet). Eigene `v2/css/tokens.css` + `v2/css/overrides.css` + `v2/assets/icons/*.svg` (umgefärbt).
- **v3** (`v3/index.html`, teal #02C78F): fertig gebaut, vom Build-Agenten selbst verifiziert (keine 404s/Konsolenfehler, Bento-Grid/Mesh-Hero/Dark-Section umgesetzt, Kontrast-Leitplanken eingehalten). Eigene `v3/css/tokens.css` + `v3/css/overrides.css` + `v3/assets/icons/*.svg` (umgefärbt). Hinweis: `preview_screenshot` hing beim v3-Build wiederholt (bekanntes Tool-Problem in dieser Session) — Verifikation lief stattdessen über `preview_inspect`/`preview_eval` (computed styles, Bounding-Boxes).
- **Noch offen (Phase 3):** Der finale, kritische Opus-Review-Pass (Screenshots + Qualitätsurteil "wirkt v2 wirklich anders/kantiger?", "wirkt v3 wirklich hochmodern?", Bug-Suche) wurde vom Nutzer vorzeitig abgebrochen, BEVOR ein Endurteil vorlag. **Nächster Schritt bei Wiederaufnahme:** Diesen Review-Pass erneut durchführen (z.B. erneut einen Opus-Agenten mit Screenshot-Auftrag starten), insbesondere den Verdacht prüfen, dass Services-Karten in v3 wegen der `.reveal`-Scroll-Animation (`opacity:0` vor Sichtbarwerden) auf Screenshots leer/kaputt wirken könnten, obwohl das Layout selbst laut Bounding-Box-Messung korrekt ist (3 Spalten × 347px). Danach Phase-3-Checkboxen unten abhaken.

## Phase 1 — Foundation
- [x] v2/, v3/ Ordnerstruktur angelegt
- [x] v2/css/tokens.css (Rot #C71902 + kantige Radien)
- [x] v3/css/tokens.css (Teal #02C78F)
- [x] Icons v2 umgefärbt + verifiziert (grep-Check: 0 Treffer #0284C7)
- [x] Icons v3 umgefärbt + verifiziert
- [x] Footer-Versions-Switcher: Markup in Root index.html + additive CSS in Root components.css

## Phase 2a — Version 2 (v2/index.html)
- [x] Hero (Split umgekehrt, Standort-Badges umpositioniert, kantigere Headline)
- [x] Trust-Bar (Leisten-Stil mit Trennstrichen)
- [x] Services (6 Karten, kantige Radien)
- [x] How-it-Works
- [x] Why-Us (Brand-BG, kantiges Deko-Element statt Blob)
- [x] Testimonials
- [x] Team (2 Standorte)
- [x] Costs (Brand-BG)
- [x] FAQ
- [x] Newsletter
- [x] Brochure-Download
- [x] Lead-Form/Kontakt (inkl. Standort-Select)
- [x] Social-Follow
- [x] Footer (inkl. Versions-Switcher, Pfade ../)
- [x] Chat-Widget (Farbe automatisch via Tokens)
- [x] Visuell verifiziert (Desktop + Mobile Screenshot)

## Phase 2b — Version 3 (v3/index.html)
- [x] Hero (Mesh-BG, große Typo, Video als volles Showcase-Panel)
- [x] Trust-Bar (große Zahlen, viel Weißraum)
- [x] Services (Bento-Grid)
- [x] How-it-Works
- [x] Why-Us
- [x] Testimonials
- [x] Team (2 Standorte)
- [x] Costs (dunkle Section-Variante, --palette-brand-900)
- [x] FAQ
- [x] Newsletter
- [x] Brochure-Download
- [x] Lead-Form/Kontakt (inkl. Standort-Select)
- [x] Social-Follow
- [x] Footer (inkl. Versions-Switcher, Pfade ../)
- [x] Chat-Widget
- [x] Kontrast-Check Teal-auf-Weiß durchgeführt (keine Fließtext-Nutzung)
- [x] Visuell verifiziert (Desktop + Mobile, via preview_inspect/eval — Screenshot-Tool zeitweise nicht verfügbar, Styles/Layout/Verhalten computed-style-geprüft)

## Phase 3 — Verifikation
- [x] Preview-Server gestartet, alle 3 Versionen erreichbar (mit Trailing-Slash `/v2/`, `/v3/`)
- [x] Footer-Switcher-Links in allen 3 Versionen getestet (korrekte Ziel-URLs, aktive Version fett+unterstrichen+Markenfarbe+aria-current="page")
- [x] v3-Bento-Services-Grid verifiziert: alle 6 Karten opacity:1 nach Scroll, kein Leer-Bug (Verdacht widerlegt); v2 Services 3×2-Grid kantig, opacity:1
- Kritisches Kurzurteil:
  - v2 (rot) wirkt spürbar anders/kantiger als v1: umgekehrter Hero-Split (Bild links/Text rechts), Standort-Badges oben, Versal-Headline, 8px-Radien, rote Akzente. Bestanden.
  - v3 (teal) wirkt hochmodern/US-SaaS-artig: zentriertes Hero mit Mesh-Gradient, große Typo, Bento-Grid für Services, teal. Bestanden.
  - v1 (blau): Text links / Bild im organischen Blob rechts. Alle 3 klar unterscheidbar.
  - Keine visuellen Bugs gefunden.
- Offene Punkte / nächste Schritte: Keine offenen Punkte, alle 3 Versionen freigegeben. (Nur Betriebshinweis: relative Pfade brauchen Trailing-Slash-URLs bzw. eine Server-Config, die `/v3` -> `/v3/` redirectet, damit die versionseigenen Tokens laden — auf GitHub Pages mit `/v3/`-Verzeichnis-URLs ist das automatisch der Fall.)
