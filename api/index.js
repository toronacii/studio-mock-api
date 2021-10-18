const express = require('express');
const api = express.Router();

api.get('/', (req, res) => res.json({ response: 'success!' }))

api.get('/applicationgenerate/:id/generateAndPublish.json', ({ query }, res) => {
  let response = () => require('./responses/generateAndPublish/index.json');
  if (query.mobile) {
    response = () => require('./responses/generateAndPublish/mobile.json');
  }

  if (query.error) {
    response = () => require('./responses/generateAndPublish/error.json');
  }

  res.json(response());
});

module.exports = api;