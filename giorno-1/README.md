# Corso Node.js + Express + JWT — Codice Giorno 1

Esempi di codice usati durante le prime 2 ore del giorno 1 del corso.

## Indice degli esempi

| Cartella | Argomento | Slide |
|---|---|---|
| `01-hello/` | Primo script Node.js, variabili globali, `process.argv` | Slide 12 |
| `02-event-loop/` | Ordine di esecuzione: sincrono, microtask, macrotask | Slide 8 |
| `03-modules/` | ES Modules: named export, default export, boilerplate `__dirname` | Slide 13 |
| `04-core-modules/` | Carrellata sui moduli core: `fs`, `path`, `os`, `events` | Slide 14 |
| `05-npm-intro/` | Primo progetto npm con `package.json` e una dipendenza esterna | Slide 15-16 |
| `06-http-hello/` | Hello World server con il modulo `http` nativo | Slide 18 |
| `07-http-routing/` | Routing manuale (perché nasce Express) | Slide 19 |
| `08-http-get-params/` | Lettura parametri da query string | Slide 20 |
| `09-http-post-body/` | Lettura body POST con stream e chunk | Slide 21 |

## Prerequisiti

- Node.js 20+ (consigliato LTS, scaricabile da [nodejs.org](https://nodejs.org))
- Un terminale (Terminal su macOS/Linux, PowerShell o cmd su Windows)
- Un editor (VS Code consigliato)

## Come usare gli esempi

Ogni cartella è un mini-progetto autonomo. In generale:

```bash
# 1. Entra nella cartella dell'esempio
cd 01-hello

# 2. Se c'è un package.json con dipendenze, installale
npm install   # solo dove serve (es. 05-npm-intro)

# 3. Esegui
node hello.js
# oppure
npm start
```

## Convenzioni del corso

- Tutti gli esempi usano **ES Modules** (`"type": "module"` + `import/export`).
- I file usano sempre l'estensione `.js` negli import (requisito ESM).
- Commenti in italiano per facilitare lo studio.
- Ogni cartella ha un `README.md` con istruzioni e punti chiave.

## Per chi vuole sperimentare

Suggerimenti di esercizi extra (non obbligatori):

- **02-event-loop**: aggiungere altri `setTimeout` con tempi diversi e prevedere l'ordine.
- **05-npm-intro**: installare `chalk` o `picocolors` e colorare l'output.
- **08-http-get-params**: aggiungere una route `GET /somma?a=2&b=3` che ritorna la somma.
- **09-http-post-body**: aggiungere validazione sul nome (es. lunghezza minima 2 caratteri).
