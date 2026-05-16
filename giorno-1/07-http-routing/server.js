// =====================================================
// Esempio 07 — Routing manuale con il modulo http
// =====================================================
// Esegui con: node server.js
//
// Prova queste URL nel browser:
//   http://localhost:3000/
//   http://localhost:3000/about
//   http://localhost:3000/non-esiste

import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.end('<h1>Home</h1><p>Benvenuto!</p>');
  } else if (req.url === '/about' && req.method === 'GET') {
    res.statusCode = 200;
    res.end('<h1>About</h1><p>Pagina informazioni</p>');
  } else {
    res.statusCode = 404;
    res.end('<h1>404 — Not Found</h1>');
  }
});

server.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});

// Nota didattica:
// Già con due endpoint vediamo che il codice cresce in fretta.
// Con 20 endpoint diventa ingestibile.
// Per questo nasce Express!
