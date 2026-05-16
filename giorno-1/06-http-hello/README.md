# 06 — Hello World server (modulo http)

Il più semplice server HTTP scrivibile in Node.js, **senza** Express.

## Esecuzione

```bash
node server.js
```

Poi apri il browser su [http://localhost:3000](http://localhost:3000).

## Punti chiave

- `http.createServer(callback)` crea un server. La callback riceve `req` e `res`.
- `res.statusCode`, `res.setHeader`, `res.end` per costruire la risposta.
- `server.listen(porta, callback)` avvia il server in ascolto.
- Per fermarlo: `Ctrl+C` nel terminale.
