const UserDeptService = require('../services/UserDeptService');
const { verifyToken } = require('../services/AuthService');

module.exports = class UserDeptController {
  static async apiGetAllUserDepts(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      const UserDepts = await UserDeptService.getAllUserDepts();
      res.json({ status: 'ok', userDepts: UserDepts });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error.message });
    }
  }

  static async apiGetDeptsbyUserId(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      const depts = await UserDeptService.getDeptsbyUserId(req.body.userId);
      res.json({ status: 'ok', depts: depts });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error.message });
    }
  }

  static async apiGetUsersbyDeptId(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      const users = await UserDeptService.getUsersbyDeptId(req.body.deptId);
      res.json({ status: 'ok', users: users });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error.message });
    }
  }

  static async apiCreateUserDept(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      const createdUserDepts = await UserDeptService.createUserDept(req.body.data);
      res.json({ status: 'ok', userDepts: createdUserDepts });
    } catch (error) {
      res.json({ status: 'error', error: error.message });
    }
  }

  static async apiDeleteUserDept(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      const deleteResponse = await UserDeptService.deleteUserDept(req.body.userIds, req.body.deptIds);
      res.json({ status: 'ok', userDepts: deleteResponse });
    } catch (error) {
      res.json({ status: 'error', error: error.message });
    }
  }
};
