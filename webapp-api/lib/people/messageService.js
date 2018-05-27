const messageService = require('./peopleService');

const init = async () => {
};

const retrieveAll = async () => {
  // Retrieve messages from comm' API, store in peopleService DB
};

const broadcast = async(person) => {
  // Send message to comm' API and broadcast to other devices
};

module.exports = {
  retrieveAll,
  broadcast
};