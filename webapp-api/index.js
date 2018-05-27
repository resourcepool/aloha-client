const express = require('express');
const bodyParser = require('body-parser');
const Logger = require('./lib/log/Logger')();
const Spinner = Logger.spinner();
const cors = require('cors');
const cronJob = require('./lib/utils/cronForDB');

const PeopleController = require('./lib/poi/peopleController');

const setGlobalHeaders = async (req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
};

const initEndpoints = async () => {
    let app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());

    ///////// PEOPLE ///////////////

    // GET
    app.get('/*', setGlobalHeaders);
    app.get('/people', PeopleController.onGet);

    // POST
    app.post('/*', setGlobalHeaders);
    app.post('/people', PeopleController.onPost);

    ///////////////////////////////////

    app.listen(process.env.PORT || 8080);
};

const init = async () => {
    Logger.info('Initializing app');
    Spinner.start('Connecting to Database');
    Spinner.succeed();
    Spinner.start('Starting cron job');
    cronJob.startJob(() => {
        Spinner.succeed();
    });
    await PeopleController.init();
    await initEndpoints();
};

(async () => {
    await init();
})();
