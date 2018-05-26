const Message = require('./plane').messageModel;

const init = async () => {

};

const findAll = async () => {
  return await Plane.find({});
};

const find = async (hex) => {

  let query = {
    hex: hex
  };

  let planes = await Plane.find(query);
  return {
    data: planes
  };

};

const remove = async (hex) => {
  await Plane.remove({
    hex: hex
  });

  return hex;
};


module.exports = {
  init,
  save,
  findByBbox,
  findAll,
  find,
  remove
};