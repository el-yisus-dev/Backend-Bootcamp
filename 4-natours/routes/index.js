const { Router } = require('express');

const routerTours = require('./tours');
const routerUsers = require('./users');

const routerAPI = (app) => {
  const router = Router();

  app.use('/api/v1/', router);

  router.use('/tours', routerTours);
  router.use('/users', routerUsers);
};

module.exports = routerAPI;
