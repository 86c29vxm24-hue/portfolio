# Portfolio Website

Dieses Projekt ist eine One-Page-Portfolio-Seite im Stil deiner Figma-Vorlage.

## Dateien

- `index.html`: Struktur und Inhalte der Seite
- `style.css`: komplettes Design und Responsive-Verhalten
- `script.js`: Formular-Validierung im Kontaktbereich
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
- Social-Links (`GitHub`, `Mail`, `LinkedIn`)

## Kontaktformular

In `script.js` ist aktuell nur Client-Validation enthalten:

- Name: mindestens 2 Zeichen
- E-Mail: gültiges Format
- Nachricht: mindestens 10 Zeichen

Für echte Nachrichten brauchst du ein Backend oder einen Formular-Service.

## Ziel

Die Seite soll optisch nah an der Figma-Vorlage bleiben und gleichzeitig mit deinen echten Inhalten gefüllt werden.
