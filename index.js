const serverless = require("serverless-http");
const cors = require('cors');
const app = require('express')();
const api = require('./api');

app.use(cors());
app.use(({ query: { delay = 0 } }, res, next) => setTimeout(next, delay * 1000));
app.use(api);
app.use((req, res) => res.status(404).json({ error: "Not Found"}));

module.exports.app = app;
module.exports.handler = serverless(app);
