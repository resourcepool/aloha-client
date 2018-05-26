const MessageService = require('../message/messageService');

const services = [];

services['messages'] = MessageService;

const init = async () => {
  await MessageService.init();
};

const onGetPeople = async (req, res) => {
  let sources = req.query.source;
  let result = {};

  result.features = {};

  const onGet = async (req, res) => {
    let result;
    result = await services[req.params.source].find(req.params.id);
    result = JSON.stringify(result);
    res.send(result);
  };

  res.send(JSON.stringify(result));
};

module.exports = {
  init,
  onGet
};
