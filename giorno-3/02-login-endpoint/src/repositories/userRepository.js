import db from '../db/connection.js';

export async function findByEmail(email) {
  return db.get('SELECT * FROM users WHERE email = ?', email);
}

export async function findById(id) {
  return db.get('SELECT * FROM users WHERE id = ?', id);
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
