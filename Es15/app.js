const express = require('express');
const pgp = require('pg-promise')();
const app = express();
const port = 3000;

const db = pgp('postgres://username:password@localhost:5432/planets_db'); // Replace with your DB credentials

app.use(express.json());

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
