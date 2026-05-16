// =====================================================
// userRepository — UNICO punto di contatto col DB users
// =====================================================
// Tutte le funzioni sono async perche' sqlite3+sqlite
// ritorna Promise. Chi le chiama deve usare await.
//
// Tutte le query usano placeholder "?" per protezione
// anti SQL injection. NESSUNA concatenazione di stringhe.

import db from '../db/connection.js';

export async function findByEmail(email) {
  return db.get('SELECT * FROM users WHERE email = ?', email);
}

export async function findById(id) {
  return db.get('SELECT * FROM users WHERE id = ?', id);
}

export async function findAll() {
  return db.all('SELECT * FROM users ORDER BY created_at DESC');
}

export async function create({ email, passwordHash, name = null, role = 'user' }) {
  const info = await db.run(
    `INSERT INTO users (email, password_hash, name, role)
     VALUES (?, ?, ?, ?)`,
    email, passwordHash, name, role
  );
  // sqlite usa "lastID" (better-sqlite3 lo chiamava "lastInsertRowid")
  return findById(info.lastID);
}

export async function update(id, data) {
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

  fields.push("updated_at = CURRENT_TIMESTAMP");
  values.push(id);

  await db.run(
    `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
    ...values
  );
  return findById(id);
}

export async function deleteById(id) {
  const info = await db.run('DELETE FROM users WHERE id = ?', id);
  return info.changes > 0;
}

export async function count() {
  const row = await db.get('SELECT COUNT(*) AS n FROM users');
  return row.n;
}

export async function search(nome) {
  const needle = `%${(nome ?? '').toLowerCase()}%`;
  return db.all(
    'SELECT * FROM users WHERE LOWER(name) LIKE ? ORDER BY name',
    needle
  );
}
