const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Server is online').status(200);
});

module.exports = routes;