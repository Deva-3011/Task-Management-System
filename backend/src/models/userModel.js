const { query } = require('../config/db');

async function findUserByEmail(email) {
  const [rows] = await query('SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1', [email]);
  return rows[0] || null;
}

async function findUserById(id) {
  const [rows] = await query('SELECT id, email, created_at FROM users WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function createUser({ email, passwordHash }) {
  const [result] = await query('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, passwordHash]);
  return {
    id: result.insertId,
    email
  };
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser
};
