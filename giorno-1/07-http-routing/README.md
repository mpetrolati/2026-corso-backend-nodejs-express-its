# 07 — Routing manuale

Server che gestisce più route, controllando manualmente `req.url` e `req.method`.

## Esecuzione

```bash
node server.js
```

Prova queste URL:
- [http://localhost:3000/](http://localhost:3000/)
- [http://localhost:3000/about](http://localhost:3000/about)
- [http://localhost:3000/non-esiste](http://localhost:3000/non-esiste) → 404

## Punti chiave

- Per distinguere le route usiamo `req.url` e `req.method` con una catena di `if/else`.
- Per la 404 impostiamo `res.statusCode = 404`.
- **Lezione di setup**: già con poche route il codice diventa ingombrante. Express renderà tutto più pulito.
