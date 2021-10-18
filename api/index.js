const express = require('express');
const api = express.Router();

api.get('/', (req, res) => res.json({ response: 'success!' }))

api.get('/applicationgenerate/:id/generateAndPublish.json', ({ query }, res) => {
  let response = () => require('./responses/generate-and-publish/index.json');
  if (query.mobile) {
    response = () => require('./responses/generate-and-publish/mobile.json');
  }

  if (query.error) {
    response = () => require('./responses/generate-and-publish/error.json');
  }

  res.json(response());
});

api.get('/VRTP/marketplace/extensions.json', ({ query }, res) => {
  if (query.type === 'template') return res.json(require('./responses/marketplace-templates/index.json'));
  return res.json({ response: 'You must send the query type=template' })
})

module.exports = api;