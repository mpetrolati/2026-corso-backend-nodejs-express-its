# 04 — express.Router() e struttura a cartelle

Il server del 02-express-routing rifattorizzato dividendo le route per area logica. Le pagine principali stanno in `homeRoutes.js`, le piccole utility in `utilityRoutes.js`, e l'`app.js` monta i due router su base path diversi.

## Esecuzione

```bash
npm install
npm run dev
```

## Struttura del progetto

```
src/
├── routes/
│   ├── homeRoutes.js      ← /, /about
│   └── utilityRoutes.js   ← /util/saluta, /util/echo, /util/healthz
├── app.js                 ← configurazione + montaggio router
└── server.js              ← entry point (avvia il listener)
```

## Endpoint disponibili

| Metodo | Path | Cosa fa |
|---|---|---|
| `GET`  | `/` | "Home" |
| `GET`  | `/about` | "About" |
| `GET`  | `/util/saluta?nome=Mario` | "Ciao Mario!" |
| `POST` | `/util/echo` | Restituisce il body ricevuto |
| `GET`  | `/util/healthz` | 200 OK senza body |
| `*`    | qualsiasi altro | 404 dal catch-all |

## Punti chiave

- **I path nel router sono relativi** al base path su cui viene montato. Dentro `utilityRoutes.js` scriviamo `router.get('/saluta')`, ma il client lo chiama come `/util/saluta`. Express concatena automaticamente.
- **`app.js` non chiama mai `app.listen`**: lo fa `server.js`. Questa separazione paga moltissimo quando arrivano i test e quando devi cambiare il modo di avvio.
- **Il catch-all 404** è un middleware senza path: cattura tutto quello che è arrivato fin lì senza una risposta. Va registrato per ultimo, dopo tutte le route.

## Per sperimentare

- Aggiungi un terzo router `apiRoutes.js` con qualche endpoint sotto `/api` e montalo nell'app.
- Sposta lo status code 404 in un middleware dedicato (`src/middlewares/notFound.js`) e importalo in `app.js`.
