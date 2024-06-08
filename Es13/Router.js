const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Dummy database
let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

// Joi schema for planet validation
const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required()
});

// Middleware to validate planet
const validatePlanet = (req, res, next) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// GET all planets
router.get('/api/planets', (req, res) => {
  res.json(planets);
});

// GET planet by id
router.get('/api/planets/:id', (req, res) => {
  const planet = planets.find(planet => planet.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ error: 'Planet not found' });
  res.json(planet);
});

// POST create a new planet
router.post('/api/planets', validatePlanet, (req, res) => {
  const newPlanet = {
    id: req.body.id,
    name: req.body.name
  };
  planets.push(newPlanet);
  res.status(201).json({ msg: 'Planet created successfully' });
});

// PUT update a planet by id
router.put('/api/planets/:id', validatePlanet, (req, res) => {
  const planet = planets.find(planet => planet.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ error: 'Planet not found' });
  
  planet.name = req.body.name;
  res.status(200).json({ msg: 'Planet updated successfully' });
});

// DELETE a planet by id
router.delete('/api/planets/:id', (req, res) => {
  const index = planets.findIndex(planet => planet.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Planet not found' });
  
  planets.splice(index, 1);
  res.status(200).json({ msg: 'Planet deleted successfully' });
});

module.exports = router;
