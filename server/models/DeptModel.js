const mongoose = require('mongoose');

const Department = new mongoose.Schema(
  {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    head: {
      type: 'string',
      required: true,
    },
    students: {
      type: 'array',
    },
  },
  { collection: 'departments' }
);

const model = mongoose.model('Department', Department);

module.exports = model;
