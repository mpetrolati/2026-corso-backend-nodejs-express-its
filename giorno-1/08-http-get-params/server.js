// =====================================================
// Esempio 08 — Leggere parametri GET (query string)
// =====================================================
// Esegui con: node server.js
//
// Prova nel browser:
//   http://localhost:3000/saluta?nome=Mario
//   http://localhost:3000/saluta?nome=Anna&cognome=Rossi
//   http://localhost:3000/saluta

import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  // L'oggetto URL ci permette di analizzare comodamente la richiesta.
  // Il secondo argomento è la "base" per i path relativi.
  const url = new URL(req.url, `http://${req.headers.host}`);

  console.log(`${req.method} ${url.pathname}`, '?', url.search);

  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (url.pathname === '/saluta' && req.method === 'GET') {
    // searchParams.get() estrae un singolo parametro
    const nome = url.searchParams.get('nome') || 'sconosciuto';
    const cognome = url.searchParams.get('cognome') || '';

    res.statusCode = 200;
    res.end(JSON.stringify({
      messaggio: `Ciao ${nome} ${cognome}`.trim() + '!',
      parametriRicevuti: Object.fromEntries(url.searchParams),
    }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ errore: 'Route non trovata' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
