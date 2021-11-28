const mongoose = require('mongoose');

const UserModel = new mongoose.Schema(
  {
    userType: {
      type: 'string',
      default: 'student',
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
    departments: {
      type: 'array',
    },
  },
  { collection: 'users' }
);

module.exports = User = mongoose.model('User', UserModel);
