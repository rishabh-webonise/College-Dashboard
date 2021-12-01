const mongoose = require('mongoose');

const UserDeptModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    deptId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  { collection: 'user_dept' }
);

UserDeptModel.index({ userId: 1, deptId: 1 }, { unique: true }); //compound index to avoid duplicate pairs

module.exports = UserDept = mongoose.model('UserDept', UserDeptModel);
