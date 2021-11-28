const User = require('../models/UserModel');

module.exports = class UserService {
  static async getAllUsers() {
    try {
      const allUsers = await User.find();
      return allUsers;
    } catch (error) {
      console.log(`Could not fetch Users ${error}`);
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

  static async updateUserDepartments(UserId, departments) {
    try {
      const updateResponse = await User.updateOne({ _id: UserId }, { $set: { departments: departments } });
      return updateResponse;
    } catch (error) {
      console.log(`Could not update User ${error}`);
    }
  }

  static async deleteUser(UserId) {
    try {
      const deletedResponse = await User.findOneAndDelete({ _id: UserId });
      return deletedResponse;
    } catch (error) {
      console.log(`Could  ot delete User ${error}`);
    }
  }
};
