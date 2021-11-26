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

api.get('/:project/marketplace/extensions.json', ({ query }, res) => {
  if (query.type === 'template') return res.json(require('./responses/marketplace/index.json'));
  return res.json({ response: 'You must send the query type=template' })
})

api.get('/:project/marketplace/extensions/:id/metadata.json', ({ query }, res) => {
  res.json(require('./responses/marketplace/metadata.json'));
})

api.get('/:project/transactions/list/index.json', ({ query }, res) => {
  if (query.empty) return res.json({
    statusCode: 200,
    responseBody: [],
    statusMessage: "OK"
  });
  res.json(require('./responses/transactions/index.json'));
})

api.get('/:project/external-services/list-with-methods.json', ({ query }, res) => {
  if (query.empty) return res.json({
    statusCode: 200,
    responseBody: [],
    statusMessage: "OK"
  });
  res.json(require('./responses/external-services/list-with-methods.json'));
})

api.get('/:project/libinter/:id/list.json', (req, res) => {
  res.json(require('./responses/interfaces/list.json'));
})

module.exports = api;