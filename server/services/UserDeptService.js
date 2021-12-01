const UserDept = require('../models/UserDeptModel');

module.exports = class UserDeptService {
  static async getAllUserDepts() {
    try {
      const allUserDepts = await UserDept.find();
      return allUserDepts;
    } catch (error) {
      console.log(`Could not fetch UserDepts ${error}`);
    }
  }

  static async getDeptsbyUserId(userId) {
    try {
      const userDeptResponse = await UserDept.find({ userId });
      return userDeptResponse;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  static async getUsersbyDeptId(deptId) {
    try {
      const userDeptResponse = await UserDept.find({ deptId });
      return userDeptResponse;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  static async createUserDept(data) {
    try {
      const response = await UserDept.insertMany(data, { ordered: false });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  static async deleteUserDept(userIds, deptIds) {
    try {
      const deletedResponse = await UserDept.deleteMany({ userId: { $in: userIds }, deptId: { $in: deptIds } });
      return deletedResponse;
    } catch (error) {
      console.log(error.message);
    }
  }
};
