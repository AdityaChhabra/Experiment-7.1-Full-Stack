import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

// Allow your React dev server in dev (adjust ports as needed)
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  })
);

// Fake in-memory data
let todos = [
  { id: 1, text: 'Learn Axios', done: false },
  { id: 2, text: 'Connect React to Express', done: true },
];

// Routes live under /api
app.get('/api/todos', (req, res) => res.json(todos));

app.post('/api/todos', (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ message: 'text is required' });
  const item = { id: Date.now(), text, done: false };
  todos.push(item);
  res.status(201).json(item);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
