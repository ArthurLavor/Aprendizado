const express = require('express');
const cors = require('cors');
const path = require('path');
const connection = require('./db');

const app = express();

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// GET /tasks endpoint to fetch all tasks
app.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// POST /tasks endpoint to add a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  connection.query(
    'INSERT INTO tasks (title, description) VALUES (?, ?)',
    [title, description],
    (err, result) => {
      if (err) {
        console.error('Database insertion error:', err);
        return res.status(500).json({ error: 'Database error inserting task' });
      }
      res.status(201).json({ id: result.insertId, title, description });
    }
  );
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});