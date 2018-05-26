// FIXME const CommService = require('../message/commService');
const PeopleService = require('../people/peopleService');

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

const init = async () => {
  await PeopleService.init();
};

const onGet = async (req, res) => {
  let result;
  result = await PeopleService.find(req.params.limit || DEFAULT_LIMIT, req.params.offset || DEFAULT_OFFSET, req.params.search);
  result = JSON.stringify(result);
  res.send(result);
};

const onPost = async (req, res) => {
  try {
      await PeopleService.insert(req.body);
      res.send('OK');
  } catch(e) {
    console.log(e);
    res.send('NOT OK');
  }
}

module.exports = {
  init,
  onGet,
    onPost,
  DEFAULT_OFFSET,
  DEFAULT_LIMIT
};
