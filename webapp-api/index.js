const express = require('express');
const bodyParser = require('body-parser');
const DB = require('./lib/db/index');

const PoiController = require('./lib/poi/poiController');

const setGlobalHeaders = async (req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
};

const initMessageApi = async () => {
  let app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.get('/*', setGlobalHeaders);

  const base = '/people';

  app.get(base + '/:source/:id', PoiController.onGet);

  app.listen(process.env.PORT || 8082);
};

const init = async () => {
  Logger.info('Initializing app');
  Spinner.start('Connecting to Database');
  await DB.connect();
};

(async () => {
  await init();
})();
