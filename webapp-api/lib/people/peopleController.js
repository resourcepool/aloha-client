// FIXME const CommService = require('../message/commService');
const MessageService = require("./messageService");

const PeopleService = require('../people/peopleService');
const Logger = require('../log/Logger')();

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

const init = async () => {
  await PeopleService.init();
};

const onGet = async (req, res) => {
  let result;
  try {
  result = await PeopleService.find(req.query.limit || DEFAULT_LIMIT, req.query.offset || DEFAULT_OFFSET, req.query.filter);
  result = JSON.stringify(result);
  res.send(result);
  } catch(e) {
    Logger.error(e);
    res.sendStatus(500);
  }
};

const onPost = async (req, res) => {
  try {
      const insertedPerson = await PeopleService.insert(req.body);
      await MessageService.broadcast(insertedPerson);
      res.sendStatus(200);
  } catch(e) {
    Logger.error(e);
    res.sendStatus(500);
  }
};

module.exports = {
  init,
  onGet,
    onPost,
  DEFAULT_OFFSET,
  DEFAULT_LIMIT
};
