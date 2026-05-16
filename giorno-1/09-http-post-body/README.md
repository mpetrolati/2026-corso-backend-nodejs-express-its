# 09 — Body POST (stream + chunk)

Server che riceve dati JSON in POST e li rispedisce indietro come eco.

## Esecuzione

```bash
node server.js
```

Test con `curl`:

```bash
curl -X POST http://localhost:3000/echo \
  -H "Content-Type: application/json" \
  -d '{"nome":"Mario","eta":30}'
```

Oppure usa Postman / REST Client (estensione VS Code).

## Punti chiave

- Il body NON arriva tutto insieme: arriva a "chunk" via stream.
- Bisogna registrarsi sull'evento `data` per accumulare i chunk.
- Solo sull'evento `end` il body è completo e si può fare `JSON.parse`.
- Gestire **sempre** l'errore di parsing con un `try/catch` (status 400 se il JSON è malformato).

## Confronto con Express

Tutto questo codice in Express si riduce a:

```javascript
app.use(express.json());
app.post('/echo', (req, res) => res.json(req.body));
```

Questo è il **vero motivo** per cui Express esiste.
