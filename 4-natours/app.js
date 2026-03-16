/* eslint-disable no-console */
/* eslint-disable node/no-unpublished-require */
const express = require('express');
const morgan = require('morgan');

const { config } = require('../1-intro-node-js/config');
const routerAPI = require('./routes');

const app = express();

// middleware to read JSON
app.use(express.json());

// Set up morgan
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// my own middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  console.log('Hello arount the middleware');

  next();
});

// Router
routerAPI(app);

// Set up to handle static files
// I need to set up this middleware after the routes to avoid routes errors
app.use(express.static(`${__dirname}/public`));

app.listen(config.port, () => {
  console.log(`App running on http://localhost:${config.port}`);
});
