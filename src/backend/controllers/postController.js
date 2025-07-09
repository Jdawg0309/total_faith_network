const db = require('../models/db');

exports.getPosts = (req, res) => {
  const posts = db.prepare(`
    SELECT p.*, u.email AS author_email 
    FROM posts p
    JOIN users u ON p.author_id = u.id
    ORDER BY p.created_at DESC
  `).all();
  res.json(posts);
};

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  const stmt = db.prepare(`INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)`);
  const info = stmt.run(title, content, userId);
  res.json({ id: info.lastInsertRowid });
};

exports.updatePost = (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  db.prepare(`UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(title, content, id);
  res.json({ message: 'Post updated' });
};

exports.deletePost = (req, res) => {
  const { id } = req.params;
  db.prepare(`DELETE FROM posts WHERE id = ?`).run(id);
  res.json({ message: 'Post deleted' });
};
