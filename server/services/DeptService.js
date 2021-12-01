const mongoose = require('mongoose');
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

  static async getDeptbyId(deptId) {
    try {
      const singleDeptResponse = await Dept.findById({ _id: deptId });
      return singleDeptResponse;
    } catch (error) {
      console.log(`Dept not found. ${error}`);
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

  static async deleteDept(deptId) {
    try {
      const res1 = await Dept.findOneAndDelete({ _id: deptId });
      const res2 = await UserDept.deleteMany({ deptId });
      return [res1, res2];
    } catch (error) {
      console.log(`Could not delete Dept: ${error.message}`);
    }
  }

  static async getDeptbyUserId(userId) {
    let id = mongoose.Types.ObjectId(userId);
    try {
      const response = await Dept.aggregate([
        { $project: { head: 0, students: 0 } },
        {
          $lookup: {
            from: 'user_dept',
            let: { deptId: '$_id' },
            pipeline: [{ $match: { $expr: { $and: [{ $eq: ['$userId', id] }, { $eq: ['$deptId', '$$deptId'] }] } } }],
            as: 'status',
          },
        },
        {
          $addFields: {
            status: {
              $cond: {
                if: { $size: '$status' },
                then: true,
                else: false,
              },
            },
          },
        },
      ]);
      return response;
    } catch (error) {
      console.log(`Dept not found. ${error}`);
    }
  }

  static async getDeptsTable() {
    try {
      const userDeptResponse = await Dept.aggregate([
        {
          $lookup: {
            from: 'user_dept',
            localField: '_id',
            foreignField: 'deptId',
            as: 'students',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'students.userId',
            foreignField: '_id',
            as: 'students',
          },
        },
        {
          $addFields: {
            students: {
              $reduce: {
                input: '$students',
                initialValue: '',
                in: {
                  $concat: [
                    '$$value',
                    {
                      $cond: {
                        if: { $eq: ['$$value', ''] },
                        then: '',
                        else: ', ',
                      },
                    },
                    '$$this.name',
                  ],
                },
              },
            },
          },
        },
      ]);
      return userDeptResponse;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
};
