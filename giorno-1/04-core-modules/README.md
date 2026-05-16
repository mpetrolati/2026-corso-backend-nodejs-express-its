# 04 — Moduli core di Node.js

Carrellata veloce sui moduli core più importanti.

## Esecuzione

```bash
npm run fs       # File system
npm run path     # Path cross-platform
npm run os       # Info sistema operativo
npm run events   # EventEmitter
```

## Punti chiave

- **fs**: scrivere e leggere file (versione `fs/promises` con async/await)
- **path**: gestire path in modo cross-platform (`join`, `resolve`, `dirname`)
- **os**: info su CPU, RAM, utente, sistema operativo
- **events**: pattern `EventEmitter`, base di tantissimi oggetti Node (incluso `http.Server` e `req`/`res`)
