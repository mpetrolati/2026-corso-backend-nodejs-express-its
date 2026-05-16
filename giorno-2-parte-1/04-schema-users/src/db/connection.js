// =====================================================
// Apertura della connessione SQLite + bootstrap schema
// =====================================================
// Questo file e' il PUNTO UNICO da cui passa l'apertura
// del DB. Qualunque altro file che vuole leggere/scrivere
// importa da qui ("import db from './db/connection.js'").
//
// All'avvio:
//  1. crea la cartella ./data se non esiste
//  2. apre (o crea) il file SQLite
//  3. esegue la DDL della tabella users (idempotente)

import Database from 'better-sqlite3';
import { readFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1) Mi assicuro che la cartella data/ esista
const dataDir = path.join(__dirname, '../../data');
mkdirSync(dataDir, { recursive: true });

// 2) Apro (o creo) il file SQLite
const dbPath = path.join(dataDir, 'app.db');
const db = new Database(dbPath);

// 3) Eseguo la DDL dello schema
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = readFileSync(schemaPath, 'utf-8');
db.exec(schema);

console.log(`[db] Connesso a ${dbPath}`);

export default db;
