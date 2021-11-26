const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    userType: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },
  { collection: 'users' }
);

const model = mongoose.model('User', User);

module.exports = model;
