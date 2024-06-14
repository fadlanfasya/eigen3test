const express = require('express');

const app = express();

app.use(express.json());
app.use(require("cors")());

//Routes
const routes = require('./routes/routes.js');
app.use('/api', routes);

module.exports = app