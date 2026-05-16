# 04 — Schema della tabella users + bootstrap

`schema.sql` con la DDL della tabella `users` + `connection.js` che apre il DB ed esegue lo schema al primo avvio. Tutto idempotente: puoi rilanciare lo script all'infinito.

## Esecuzione

```bash
npm install
npm start
# oppure: node src/bootstrap.js
```

Lo script crea `data/app.db`, esegue lo schema, ispeziona le colonne e gli indici, inserisce un utente di prova, lo legge e chiude la connessione.

## Output atteso (primo run)

```
[db] Connesso a /path/to/data/app.db

=== Struttura della tabella users ===
[
  { cid: 0, name: 'id', type: 'INTEGER', ... },
  { cid: 1, name: 'email', type: 'TEXT', notnull: 1, ... },
  { cid: 2, name: 'password_hash', type: 'TEXT', notnull: 1, ... },
  { cid: 3, name: 'name', type: 'TEXT', ... },
  { cid: 4, name: 'role', type: 'TEXT', dflt_value: "'user'", ... },
  ...
]

=== Indici sulla tabella users ===
[
  { seq: 0, name: 'idx_users_email', unique: 0, ... },
  { seq: 1, name: 'sqlite_autoindex_users_1', unique: 1, ... }
]

=== Inserisco un utente di prova ===
Inserito id: 1

=== Utenti attualmente in tabella ===
[ { id: 1, email: 'test@example.com', name: 'Test User', role: 'user', ... } ]
```

## Output atteso (secondo run)

```
=== Inserisco un utente di prova ===
Errore (atteso al secondo run): UNIQUE constraint failed: users.email
```

È **esattamente** ciò che vogliamo: il DB rifiuta l'inserimento di un'email duplicata. Anche se il check applicativo fallisse, il DB resta l'ultima linea di difesa.

## Punti chiave dello schema

- `id INTEGER PRIMARY KEY AUTOINCREMENT` — chiave numerica auto-incrementante, gli id non vengono riutilizzati dopo DELETE.
- `email TEXT NOT NULL UNIQUE` — vincolo a livello DB, ultima difesa contro duplicati.
- `password_hash TEXT NOT NULL` — il nome del campo ti ricorda visivamente: non c'è la password in chiaro qui dentro.
- `role TEXT NOT NULL DEFAULT 'user'` — predisposto per RBAC futura, costa zero metterlo ora.
- `created_at` / `updated_at` — buona pratica universale, sempre.
- `idx_users_email` — la lookup per email è O(log n) invece di O(n). Ogni login farà `WHERE email = ?`.

## Punti chiave del bootstrap

- `mkdirSync('./data', { recursive: true })` — la cartella deve esistere prima di aprire il DB, altrimenti `sqlite3` non riesce a creare il file.
- `await open({ filename, driver: sqlite3.Database })` — apre la connessione e ritorna una Promise (top-level await in ESM).
- `await db.exec(schema)` — esegue uno script SQL multi-statement (perfetto per la DDL).
- `IF NOT EXISTS` su tabella e indice — rende l'operazione idempotente, riavviabile a piacere.

## Per sperimentare

- Aggiungi un campo `avatar_url TEXT` allo schema. Cancella `data/app.db` e rilancia: vedrai il campo apparire nella struttura.
- Aggiungi un secondo indice: `CREATE INDEX idx_users_role ON users(role);`. Vedrai apparire in `PRAGMA index_list`.
- Prova ad aggiungere un campo NOT NULL senza default a tabella già popolata: vedrai SQLite lamentarsi. È un'occasione per parlare di **migrazioni** del DB (argomento avanzato, fuori scope del corso).
