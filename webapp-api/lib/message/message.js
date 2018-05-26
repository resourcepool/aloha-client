const sqlite = require('sqlite');
const Schema = sqlite.Schema;

const messageSchema = new Schema({
    offset: Number,
    limit: Number,
    total: Number,
    filter: String,
    items: {
        firstName: String,
        lastName: String,
        status: String,
        description: String,
        tags: [String]
      }
});

messageSchema.index({location: 'people'});

const messageModel = sqlite.model('Message', messageSchema);

module.exports = {
    messageModel
};
