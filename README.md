# Portfolio Website

Dieses Projekt ist eine One-Page-Portfolio-Seite im Stil deiner Figma-Vorlage.

## Dateien

- `index.html`: Struktur und Inhalte der Seite
- `css/main.css`: zentraler CSS-Einstiegspunkt
- `css/base/`: Fonts, Variablen, globale Regeln, Utilities
- `css/layout/`: Header/Topbar und globale Layout-Helfer
- `css/components/`: wiederverwendbare UI-Elemente (Menu, Buttons, Pfeile)
- `css/sections/`: Bereichs-Styles (Hero, About, Skills, Portfolio, References, Contact)
- `css/pages/`: seitenbezogene Styles (Legal Pages)
- `css/responsive/`: Breakpoints für Tablet und Mobile
- `js/language.js`: Sprachumschaltung (DE/EN)
- `js/script.js`: Formular-Validierung und Versandlogik im Kontaktbereich
- `img/icons/`: verwendete Skill-Icons
- `Portfolio-Checkliste.pdf`: Projekt-Checkliste (Anforderungen)

## Lokal starten

Einfach `index.html` im Browser öffnen.

Optional mit lokalem Server:

```bash
python3 -m http.server 5500
```

Dann im Browser öffnen: `http://localhost:5500`

## Personalisieren

Passe in `index.html` an:

- Name im Hero-Bereich (`Dein Name`)
- About-Text und Standort
- eigenes Profilbild (Platzhalter ersetzen)
- Projektkarten (Screenshots, Titel, Links)
- Referenzen (Namen/Zitate)
- Social-Links (`GitHub`, `Mail`)

## Kontaktformular

In `js/script.js` ist aktuell Client-Validation plus Versandlogik enthalten:

- Name: mindestens 2 Zeichen
- E-Mail: gültiges Format
- Nachricht: mindestens 10 Zeichen

Für echte Nachrichten brauchst du ein Backend oder einen Formular-Service.

## Ziel

Die Seite soll optisch nah an der Figma-Vorlage bleiben und gleichzeitig mit deinen echten Inhalten gefüllt werden.
