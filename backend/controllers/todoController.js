import { todoModel } from '../models/todoModel.js';

export const todoController = {
  // GET /api/todos
  async getTodos(req, res) {
    try {
      const todos = await todoModel.getAll();
      console.log('Retrieved todos:', todos); // Log the retrieved todos
      res.json(todos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /api/todos
  async createTodo(req, res) {
    try {
      const { title } = req.body;
      if (!title || !title.trim()) {
        return res.status(400).json({ error: 'Title is required' });
      }
      const newTodo = await todoModel.create(title.trim());
      console.log('Created new todo:', newTodo); // Log the created todo
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // PUT /api/todos/:id
  async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const { completed, title } = req.body;
      const updated = await todoModel.update(id, { completed, title });
      if (!updated) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      console.log('Updated todo:', updated); // Log the updated todo
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /api/todos/:id
  async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const deleted = await todoModel.delete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      console.log('Deleted todo:', deleted); // Log the deleted todo
      res.json({ message: 'Todo deleted successfully', id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
