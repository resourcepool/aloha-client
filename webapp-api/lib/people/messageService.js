const PeopleService = require("./peopleService");
const axios = require('axios');

const init = async () => {
};

const retrieveAll = async () => {
  // Retrieve messages from comm' API, store in peopleService DB
  console.log('job 1 ticked');

  let response = await axios.get('http://localhost:5000/messages');
  console.log(response.data);
  PeopleService.insertAll(response.data.messages);
};


const _buildQuery = (person) => {
  let qs = "?";
  qs += '&firstName=' + person.firstName;
  qs += '&lastName=' + person.lastName;
  qs += '&description=' + person.description;
  qs += '&status=' + person.status;
  for (let i in person.tags) {
    qs += '&tags=' + person.tags[i];
  }
  return qs;
};

const broadcast = async (person) => {
  // Send message to comm' API and broadcast to other devices
  let response = await axios.post('http://localhost:5000/message/' + person.id + _buildQuery(person));
};

module.exports = {
  retrieveAll,
  broadcast
};