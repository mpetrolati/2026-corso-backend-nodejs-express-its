// =====================================================
// Apertura della connessione SQLite + bootstrap schema
// =====================================================
// Usa sqlite3 (driver con binari precompilati) + sqlite
// (wrapper a Promise sopra sqlite3). Niente compilazione
// su Windows.
//
// All'avvio:
//  1. crea la cartella ./data se non esiste
//  2. apre (o crea) il file SQLite
//  3. esegue la DDL della tabella users (idempotente)

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { readFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1) Mi assicuro che la cartella data/ esista
const dataDir = path.join(__dirname, '../../data');
mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, 'app.db');

// 2) Apro (o creo) il file SQLite — top-level await
const db = await open({
  filename: dbPath,
  driver: sqlite3.Database
});

// 3) Eseguo la DDL dello schema
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = readFileSync(schemaPath, 'utf-8');
await db.exec(schema);

console.log(`[db] Connesso a ${dbPath}`);

export default db;
