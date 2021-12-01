const User = require('../models/UserModel');
const UserDept = require('../models/UserDeptModel');

module.exports = class UserService {
  static async getAllUsers() {
    try {
      const allUsers = await User.find();
      return allUsers;
    } catch (error) {
      console.log(`Could not fetch Users ${error}`);
    }
  }

  static async getUserbyId(UserId) {
    try {
      const singleUserResponse = await User.findById({ _id: UserId });
      return singleUserResponse;
    } catch (error) {
      console.log(`User not found. ${error}`);
    }
  }

  static async getUserbyEmail(EmailId) {
    try {
      const singleUserResponse = await User.findOne({ email: EmailId });
      return singleUserResponse;
    } catch (error) {
      console.log(`User not found. ${error}`);
    }
  }

  static async createUser(data) {
    try {
      const newUser = {
        userType: data.userType,
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const response = await new User(newUser).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(userId) {
    try {
      const res1 = await User.findOneAndDelete({ _id: userId });
      const res2 = await UserDept.deleteMany({ userId });
      return [res1, res2];
    } catch (error) {
      console.log(`Could not delete User: ${error.message}`);
    }
  }

  static async getUsersTable() {
    try {
      const userDeptResponse = await User.aggregate([
        { $match: { userType: 'student' } },
        {
          $lookup: {
            from: 'user_dept',
            localField: '_id',
            foreignField: 'userId',
            as: 'departments',
          },
        },
        {
          $lookup: {
            from: 'departments',
            localField: 'departments.deptId',
            foreignField: '_id',
            as: 'departments',
          },
        },
        {
          $addFields: {
            departments: {
              $reduce: {
                input: '$departments',
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
