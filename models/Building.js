const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false
  },
  links: [
    {
      link: {
        type: String,
        required: false
      }
    }
  ],
  type: {
    type: String,
    required: false,
  },
});
module.exports = model('Building', schema);
