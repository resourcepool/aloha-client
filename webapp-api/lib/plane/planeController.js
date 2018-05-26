const messageService = require('./messageService');

const init = async () => {
};

const onGet = async (req, res) => {
  let result = await messageService.findAll();
  result = JSON.stringify(result);
  res.end(result);
};

module.exports = {
  init,
  onGet
};