// =====================================================
// Apertura della connessione SQLite + bootstrap schema
// =====================================================
// sqlite3 (driver con binari precompilati) + sqlite
// (wrapper a Promise). Niente compilazione su Windows.

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { readFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from '../config/env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.dirname(path.resolve(env.dbPath));
mkdirSync(dataDir, { recursive: true });

// Top-level await: il modulo aspetta che il DB sia pronto
// prima di esportare db.
const db = await open({
  filename: env.dbPath,
  driver: sqlite3.Database
});

const schema = readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
await db.exec(schema);

export default db;
