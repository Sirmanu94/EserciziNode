const express = require('express');
const pgp = require('pg-promise')();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Database connection
const db = pgp('postgres://username:password@localhost:5432/planets_db'); // Replace with your DB credentials

// Middleware to parse JSON bodies
app.use(express.json());

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Routes
app.get('/planets', async (req, res) => {
  try {
    const planets = await db.any('SELECT * FROM planets');
    res.json(planets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/planets/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const planet = await db.one('SELECT * FROM planets WHERE id=$1', [id]);
    res.json(planet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/planets', async (req, res) => {
  const { name } = req.body;
  try {
    await db.none('INSERT INTO planets (name) VALUES ($1)', [name]);
    res.status(201).json({ message: 'Planet added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/planets/:id', async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    await db.none('UPDATE planets SET name=$2 WHERE id=$1', [id, name]);
    res.json({ message: 'Planet updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/planets/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.none('DELETE FROM planets WHERE id=$1', [id]);
    res.json({ message: 'Planet deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/planets/:id/image', upload.single('image'), async (req, res) => {
  const id = req.params.id;
  const imagePath = req.file.path;

  try {
    await db.none('UPDATE planets SET image=$2 WHERE id=$1', [id, imagePath]);
    res.json({ message: 'Image uploaded and path saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
