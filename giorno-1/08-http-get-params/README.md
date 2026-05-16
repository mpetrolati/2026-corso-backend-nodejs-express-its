# 08 — Parametri GET (query string)

Server che legge i parametri dalla query string della URL.

## Esecuzione

```bash
node server.js
```

Prova queste URL:
- [http://localhost:3000/saluta?nome=Mario](http://localhost:3000/saluta?nome=Mario)
- [http://localhost:3000/saluta?nome=Anna&cognome=Rossi](http://localhost:3000/saluta?nome=Anna&cognome=Rossi)
- [http://localhost:3000/saluta](http://localhost:3000/saluta) → usa il valore di default

## Punti chiave

- `new URL(req.url, base)` permette di "smontare" la richiesta in parti.
- `url.pathname` → la parte del percorso (es. `/saluta`).
- `url.searchParams.get('nome')` → estrae un parametro singolo.
- `Object.fromEntries(url.searchParams)` → converte tutti i parametri in un oggetto.
