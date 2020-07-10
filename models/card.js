const mongoose = require('mongoose');

// eslint-disable-next-line no-useless-escape
const Url = /^(https|http):\/\/(www\.{1})?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[\w\.\-_]+\.[a-z]{2,})(:\d{2,5})?((\/[a-z0-9-%_]{1,})*)?(\/|#)?(\.[a-z]{1,3})?$/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator: (link) => Url.test(link),
      message: 'Тут должна быть ссылка',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
