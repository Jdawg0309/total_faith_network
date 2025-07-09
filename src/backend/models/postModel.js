const db = require('./db');

const getAll = () =>
  db.prepare(`
    SELECT p.*, u.email AS author_email
    FROM posts p
    LEFT JOIN users u ON p.author_id = u.id
    ORDER BY created_at DESC
  `).all();

const getById = (id) =>
  db.prepare(`
    SELECT p.*, u.email AS author_email
    FROM posts p
    LEFT JOIN users u ON p.author_id = u.id
    WHERE p.id = ?
  `).get(id);

const create = (title, content, author_id) =>
  db.prepare(`
    INSERT INTO posts (title, content, author_id)
    VALUES (?, ?, ?)
  `).run(title, content, author_id);

const remove = (id) =>
  db.prepare(`DELETE FROM posts WHERE id = ?`).run(id);

module.exports = { getAll, getById, create, remove };
