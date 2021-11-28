const UserService = require('../services/UserService');
const { verifyToken, encryptPassword } = require('../services/AuthService');

module.exports = class UserController {
  static async apiGetAllUsers(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      const users = await UserService.getAllUsers();
      res.json({ status: 'ok', users: users });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: 'Invalid token' });
    }
  }

  static async apiGetUserById(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      let id = req.params.id || {};
      const user = await UserService.getUserbyId(id);
      res.json({ status: 'ok', user: user });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: 'Invalid token' });
    }
  }

  static async apiCreateUser(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      const user = req.body;
      user.password = await encryptPassword(req.body.password, 10);
      const createdUser = await UserService.createUser(user);
      res.json({ status: 'ok', user: createdUser });
    } catch (error) {
      res.json({ status: 'error', error: 'An account with this email already exists!' });
    }
  }

  static async apiUpdateUserDepartments(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      const updatedUser = await UserService.updateUserDepartments(req.params.id, req.body.departments);
      if (updatedUser.modifiedCount === 0) throw new Error('Unable to update User, error occurred!');
      res.json({ status: 'ok', user: updatedUser });
    } catch (error) {
      res.json({ status: 'error', error: 'Invalid request' });
    }
  }

  static async apiDeleteUser(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      let id = req.params.id;
      const deleteResponse = await UserService.deleteUser(id);
      res.json({ status: 'ok', user: deleteResponse });
    } catch (error) {
      res.json({ status: 'error', error: 'User could not be deleted' });
    }
  }
};
