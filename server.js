const http = require('http');
const fs = require('fs');
const url = require('url');
const connection = require('./db'); // Your connection module

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Serve the static HTML file (the visual part)
  if (req.method === 'GET' && parsedUrl.pathname === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end("Error loading the page");
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  
  // Endpoint to get the list of tasks
  } else if (req.method === 'GET' && parsedUrl.pathname === '/tasks') {
    connection.query('SELECT * FROM tasks', (err, results) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Database error' }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(results));
    });
  
  // Endpoint to add a new task
  } else if (req.method === 'POST' && parsedUrl.pathname === '/tasks') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const task = JSON.parse(body);
        connection.query(
          'INSERT INTO tasks (title, description) VALUES (?, ?)',
          [task.title, task.description],
          (err, result) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ error: 'Database error inserting task' }));
            }
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ id: result.insertId, title: task.title, description: task.description }));
          }
        );
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  
  // Not Found
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});