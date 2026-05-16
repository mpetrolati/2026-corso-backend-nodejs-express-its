# 05 — Il userRepository completo

L'intero repository pattern in un file (`userRepository.js`) + uno script `demo.js` che esercita tutte le funzioni. Niente Express qui: il repository è studiato per essere usato da qualunque consumer (un controller Express, un test, uno script CLI).

## Esecuzione

```bash
npm install
npm start
# oppure: node demo.js
```

## Funzioni esposte

| Firma | Descrizione |
|---|---|
| `findByEmail(email)` | Cerca un utente per email. Ritorna l'oggetto o `undefined`. |
| `findById(id)` | Cerca per id. Ritorna l'oggetto o `undefined`. |
| `findAll()` | Tutti gli utenti, ordinati per data di creazione DESC. |
| `create({ email, passwordHash, name?, role? })` | Crea un utente. Ritorna l'oggetto appena scritto. |
| `update(id, data)` | Aggiornamento parziale (solo i campi presenti in `data`). Ritorna l'oggetto aggiornato. |
| `deleteById(id)` | Cancella. Ritorna `true` se ha cancellato, `false` altrimenti. |
| `count()` | Numero totale di utenti. |

## Output atteso

```
=== Stato iniziale ===
Totale utenti: 0

=== Creo due utenti ===
Creato: { id: 1, email: 'mario@example.com', ... }
Creato: { id: 2, email: 'lucia@example.com', role: 'admin', ... }

=== findAll ===
[ { id: 2, ... }, { id: 1, ... } ]

...

=== Vincolo UNIQUE su email ===
Errore atteso: UNIQUE constraint failed: users.email
```

## Punti chiave

- **Tutte le query usano `?`** come placeholder. Mai concatenare stringhe.
- **`update` costruisce dinamicamente la SET clause** solo coi campi presenti nei dati. È il pattern classico per PUT/PATCH.
- **`updated_at` viene aggiornato automaticamente** dal repository: il consumer non se ne deve preoccupare.
- **Il repository non valida**: chi lo chiama (controller o service) deve validare prima. Il repository scrive ciò che gli viene chiesto.
- **Il repository non hasha**: riceve già un `passwordHash` pronto. L'hashing è logica di business e vive nel service (lo vedremo nel pomeriggio con `bcrypt`).
- **Il repository NON sa di Express**: niente `req`, niente `res`, niente `next`. È testabile in isolamento.

## Per sperimentare

- Aggiungi `findByRole(role)` che ritorna tutti gli utenti con un certo ruolo.
- Aggiungi `search(q)` che usa `WHERE name LIKE ?` (ricorda di passare `%${q}%` come parametro, sempre con placeholder).
- Aggiungi una transazione: `createMany(users)` che inserisce un array di utenti in un'unica transazione (usa `db.transaction(...)`).
- Scrivi un mini test: cancella `data/app.db` prima di lanciare lo script, verifica che `demo.js` produca sempre lo stesso output.
