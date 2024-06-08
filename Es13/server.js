const express = require('express');
const morgan = require('morgan');
const asyncErrors = require('express-async-errors');
const planetRouter = require('./Router');
require('dotenv').config();
const Joi = require('joi');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use(planetRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
