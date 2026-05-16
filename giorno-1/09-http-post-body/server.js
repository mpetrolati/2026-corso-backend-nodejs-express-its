// =====================================================
// Esempio 09 — Leggere il body in POST (stream + chunk)
// =====================================================
// Esegui con: node server.js
//
// Testare con curl:
//   curl -X POST http://localhost:3000/echo \
//     -H "Content-Type: application/json" \
//     -d '{"nome":"Mario","eta":30}'
//
// Oppure con Postman / REST Client.

import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'POST' && req.url === '/echo') {
    // Il body di una richiesta arriva a "chunk".
    // Dobbiamo accumularli e poi processarli quando arriva 'end'.
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const dati = JSON.parse(body);
        res.statusCode = 200;
        res.end(JSON.stringify({
          ricevuto: dati,
          ora: new Date().toISOString(),
        }));
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ errore: 'JSON non valido' }));
      }
    });

    req.on('error', (err) => {
      res.statusCode = 500;
      res.end(JSON.stringify({ errore: 'Errore nella lettura del body' }));
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ errore: 'Route non trovata' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
  console.log('Prova con:');
  console.log(`  curl -X POST http://localhost:${PORT}/echo -H "Content-Type: application/json" -d '{"nome":"Mario"}'`);
});

// Lezione: tutta questa fatica per leggere un body JSON!
// Con Express basterà:
//   app.use(express.json());
//   app.post('/echo', (req, res) => res.json(req.body));
