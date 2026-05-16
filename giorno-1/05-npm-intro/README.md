# 05 — Introduzione a npm

Primo progetto che usa una dipendenza esterna scaricata da npm.

## Passi

```bash
# 1. Installa le dipendenze (legge package.json, crea node_modules/)
npm install

# 2. Esegui
node app.js
# oppure
npm start
```

## Punti chiave

- `package.json` descrive il progetto e le sue dipendenze
- `npm install <pkg>` aggiunge una dipendenza a `dependencies`
- `npm install --save-dev <pkg>` la mette in `devDependencies` (solo per sviluppo)
- `node_modules/` NON va committato → metterlo in `.gitignore`
- `package-lock.json` invece SI committa (fissa le versioni esatte)

## Esercizio rapido

Prova ad installare un'altra libreria a tua scelta (es. `chalk` per colorare l'output) e usala nello script.
