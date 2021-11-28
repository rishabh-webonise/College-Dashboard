const mongoose = require('mongoose');

const DeptModel = new mongoose.Schema(
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

module.exports = Dept = mongoose.model('Department', DeptModel);
