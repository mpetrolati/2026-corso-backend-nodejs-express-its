# 03 — Primi passi con better-sqlite3

Script standalone (non un server) per prendere confidenza con `prepare/get/all/run` prima di portarli dentro l'app Express.

## Esecuzione

```bash
npm install
npm start
# oppure: node playground.js
```

Lo script:
1. Crea il file `data/app.db`.
2. Crea la tabella `products`.
3. Inserisce 3 prodotti.
4. Legge un singolo prodotto (`.get`).
5. Legge tutti i prodotti (`.all`).
6. Filtra per prezzo.
7. Aggiorna un prezzo.
8. Cancella un prodotto.
9. Mostra perché le query parametrizzate proteggono da SQL injection.

## Output atteso

```
=== INSERT ===
Inserito id: 1 righe affette: 1
Inserito id: 2
Inserito id: 3

=== SELECT singolo ===
{ id: 1, name: 'Tastiera', price: 49.9 }

=== SELECT multiplo ===
[
  { id: 1, name: 'Tastiera', price: 49.9 },
  { id: 2, name: 'Mouse', price: 19.5 },
  { id: 3, name: 'Cuffie', price: 89 }
]

=== SELECT filtrato: price < 50 ===
[
  { id: 1, name: 'Tastiera', price: 49.9 },
  { id: 2, name: 'Mouse', price: 19.5 }
]

...
```

## Punti chiave

- `db.prepare(sql)` ritorna un oggetto `Statement` riutilizzabile. Più veloce di passare la stringa SQL ogni volta.
- `.get(...)` ritorna **una** riga (oggetto) o `undefined`.
- `.all(...)` ritorna **tutte** le righe come array.
- `.run(...)` esegue INSERT/UPDATE/DELETE e ritorna `{ lastInsertRowid, changes }`.
- I parametri vanno **sempre** passati come argomenti di `.get/.all/.run`, **mai** concatenati nella query: protezione anti SQL injection.

## Apri il file con DB Browser for SQLite

[sqlitebrowser.org](https://sqlitebrowser.org) — apri `data/app.db` e ispeziona la tabella `products` in interfaccia grafica. Utilissimo durante il debug per capire se la tua query ha fatto quello che pensi.

## Per sperimentare

- Aggiungi una funzione `count()` che ritorna il numero totale di righe.
- Aggiungi una transazione: inserisci 100 prodotti in una sola transazione e cronometra il tempo. Confronta con 100 INSERT separate (`db.transaction(...)` è la sintassi di `better-sqlite3`).
- Crea una seconda tabella `categories` e una colonna `category_id` in `products`. Fai una JOIN.
