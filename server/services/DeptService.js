const Dept = require('../models/DeptModel');

module.exports = class DeptService {
  static async getAllDepts() {
    try {
      const allDepts = await Dept.find();
      return allDepts;
    } catch (error) {
      console.log(`Could not fetch Depts ${error}`);
    }
  }

  static async createDept(data) {
    try {
      const newDept = {
        name: data.name,
        head: data.head,
      };
      const response = await new Dept(newDept).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getDeptbyId(DeptId) {
    try {
      const singleDeptResponse = await Dept.findById({ _id: DeptId });
      return singleDeptResponse;
    } catch (error) {
      console.log(`Dept not found. ${error}`);
    }
  }

  static async updateDeptStudents(DeptId, students) {
    try {
      const updateResponse = await Dept.updateOne({ _id: DeptId }, { $set: { students: students } });
      return updateResponse;
    } catch (error) {
      console.log(`Could not update Dept ${error}`);
    }
  }

  static async deleteDept(DeptId) {
    try {
      const deletedResponse = await Dept.findOneAndDelete(DeptId);
      return deletedResponse;
    } catch (error) {
      console.log(`Could  ot delete Dept ${error}`);
    }
  }
};
