import express from 'express';
import { todoController } from '../controllers/todoController.js';

const router = express.Router();

router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;
