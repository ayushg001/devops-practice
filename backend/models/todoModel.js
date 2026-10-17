import { pool } from '../config/db.js';

export const todoModel = {
  // Get all todos
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM todos ORDER BY id ASC;');
    return rows;
  },

  // Create new todo
  async create(title) {
    const { rows } = await pool.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING *;',
      [title]
    );
    return rows[0];
  },

  // Update todo completed or title
  async update(id, { completed, title }) {
    const { rows } = await pool.query(
      `UPDATE todos 
       SET 
         completed = COALESCE($1, completed),
         title = COALESCE($2, title)
       WHERE id = $3 
       RETURNING *;`,
      [completed, title, id]
    );
    return rows[0];
  },

  // Delete todo
  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *;',
      [id]
    );
    return rows[0];
  },
};
