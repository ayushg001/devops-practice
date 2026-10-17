import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import jokes from './jokes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple Todo Routes (MVC)
app.use('/api/todos', todoRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Preserved jokes route for existing tests/pipelines
app.get('/api/jokes', (req, res) => {
  const random = jokes[Math.floor(Math.random() * jokes.length)];
  res.json({ joke: random });
});

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Backend running on port ${PORT}`);
  await initDB();
});