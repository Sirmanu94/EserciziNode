// controllers/planets.js
const planets = require('../dummy');

const getAll = (req, res) => {
  res.json(planets);
};

const getOneById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const planet = planets.find(planet => planet.id === id);
  if (planet) {
    res.json(planet);
  } else {
    res.status(404).json({ message: 'Planet not found' });
  }
};

const create = (req, res) => {
  const newPlanet = { id: planets.length + 1, ...req.body };
  planets.push(newPlanet);
  res.status(201).json(newPlanet);
};

const updateById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const planetIndex = planets.findIndex(planet => planet.id === id);
  if (planetIndex !== -1) {
    planets[planetIndex] = { id, ...req.body };
    res.json(planets[planetIndex]);
  } else {
    res.status(404).json({ message: 'Planet not found' });
  }
};

const deleteById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newPlanets = planets.filter(planet => planet.id !== id);
  if (newPlanets.length < planets.length) {
    planets.length = 0;
    planets.push(...newPlanets);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Planet not found' });
  }
};

module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
};
