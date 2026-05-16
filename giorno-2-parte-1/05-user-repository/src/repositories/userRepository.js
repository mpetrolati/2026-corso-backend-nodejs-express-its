// =====================================================
// userRepository — UNICO punto di contatto col DB users
// =====================================================
// Le funzioni qui sono "neutre": ricevono dati semplici
// (string, number, oggetti) e ritornano oggetti utente.
// Non sanno nulla di Express, di JWT, di bcrypt.
//
// Tutte le query usano placeholder "?" per protezione
// anti SQL injection. NESSUNA concatenazione di stringhe.

import db from '../db/connection.js';

export function findByEmail(email) {
  return db
    .prepare('SELECT * FROM users WHERE email = ?')
    .get(email);
}

export function findById(id) {
  return db
    .prepare('SELECT * FROM users WHERE id = ?')
    .get(id);
}

export function findAll() {
  return db
    .prepare('SELECT * FROM users ORDER BY created_at DESC')
    .all();
}

export function create({ email, passwordHash, name = null, role = 'user' }) {
  const info = db
    .prepare(`
      INSERT INTO users (email, password_hash, name, role)
      VALUES (?, ?, ?, ?)
    `)
    .run(email, passwordHash, name, role);

  // ritorno l'utente appena creato leggendolo dal DB
  return findById(info.lastInsertRowid);
}

export function update(id, data) {
  // costruisco dinamicamente la SET clause coi soli
  // campi presenti nei dati di input
  const fields = [];
  const values = [];

  if (data.name !== undefined) {
    fields.push('name = ?');
    values.push(data.name);
  }
  if (data.passwordHash) {
    fields.push('password_hash = ?');
    values.push(data.passwordHash);
  }
  if (data.role) {
    fields.push('role = ?');
    values.push(data.role);
  }

  if (fields.length === 0) return findById(id);

  // aggiorno anche updated_at
  fields.push("updated_at = CURRENT_TIMESTAMP");
  values.push(id);

  db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`)
    .run(...values);

  return findById(id);
}

export function deleteById(id) {
  const info = db.prepare('DELETE FROM users WHERE id = ?').run(id);
  return info.changes > 0;
}

export function count() {
  return db.prepare('SELECT COUNT(*) AS n FROM users').get().n;
}
