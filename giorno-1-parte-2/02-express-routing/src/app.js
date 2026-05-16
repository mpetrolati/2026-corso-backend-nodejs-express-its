// =====================================================
// Esempio 02 — Routing dichiarativo con Express
// =====================================================
// Mostra i quattro metodi base, l'uso di parametri di route
// (:id), query string (req.query) e body JSON (req.body).

import express from 'express';

const app = express();

// Middleware built-in: abilita il parsing automatico del body JSON.
// VA REGISTRATO PRIMA DELLE ROUTE che leggono req.body.
app.use(express.json());

// -----------------------------------------------------
// Route base equivalenti al server del Giorno 1
// -----------------------------------------------------
app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/about', (req, res) => {
  res.send('About');
});

// -----------------------------------------------------
// Query string: req.query
// Esempio: GET /saluta?nome=Mario
// -----------------------------------------------------
app.get('/saluta', (req, res) => {
  const nome = req.query.nome ?? 'sconosciuto';
  res.send(`Ciao ${nome}!`);
});

// -----------------------------------------------------
// Parametri di route: req.params
// Esempio: GET /users/42
// -----------------------------------------------------
app.get('/users/:id', (req, res) => {
  // ATTENZIONE: req.params.id è sempre una stringa, anche se sembra un numero
  const id = Number(req.params.id);
  res.json({ id, name: `Utente ${id}` });
});

// -----------------------------------------------------
// Body JSON in POST: req.body
// -----------------------------------------------------
app.post('/echo', (req, res) => {
  res.json({ ricevuto: req.body });
});

// -----------------------------------------------------
// Esempio di status code corretto in creazione (201 Created)
// -----------------------------------------------------
app.post('/users', (req, res) => {
  const { name, email } = req.body ?? {};
  if (!name || !email) {
    return res.status(400).json({ errore: 'name e email sono obbligatori' });
  }
  const nuovoUtente = { id: 1, name, email };
  res.status(201).json(nuovoUtente);
});

export default app;
