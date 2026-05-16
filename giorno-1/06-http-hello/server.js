// =====================================================
// Esempio 06 — Hello World server con il modulo http
// =====================================================
// Esegui con: node server.js
// Poi apri il browser su: http://localhost:3000

import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Imposto lo status code e gli header della risposta
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // Scrivo il body della risposta e chiudo la connessione
  res.end('Hello world!');
});

server.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
