const express = require('express');
const bodyParser = require('body-parser');
const Logger = require('./lib/log/Logger')();
const Spinner = Logger.spinner();

const PeopleController = require('./lib/poi/peopleController');

const setGlobalHeaders = async (req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
};

const initEndpoints = async () => {
  let app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // GET
  app.get('/*', setGlobalHeaders);
  app.get('/people', PeopleController.onGet);

  // POST
  app.post('/*', setGlobalHeaders);
  app.post('/people', PeopleController.onPost)

  app.listen(process.env.PORT || 8080);
};

const init = async () => {
  Logger.info('Initializing app');
  Spinner.start('Connecting to Database');
  Spinner.succeed();
  await PeopleController.init();
  await initEndpoints();
};

(async () => {
  await init();
})();
