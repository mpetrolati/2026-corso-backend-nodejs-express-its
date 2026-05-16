import Database from 'better-sqlite3';
import { readFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from '../config/env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.dirname(path.resolve(env.dbPath));
mkdirSync(dataDir, { recursive: true });

const db = new Database(env.dbPath);

const schema = readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
db.exec(schema);

export default db;
