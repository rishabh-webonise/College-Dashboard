const UserService = require('../services/UserService');
const { checkPassword, checkUserType, signToken } = require('../services/AuthService');

module.exports = class GlobalController {
  static async apiLogin(req, res, next) {
    try {
      const user = await UserService.getUserbyEmail(req.body.email);
      if (!user) throw new Error('Email not Registered');
      const isPasswordValid = await checkPassword(req.body.password, user.password);
      if (!isPasswordValid) throw new Error('Wrong Password');
      const isUserTypeValid = checkUserType(req.body.userType, user.userType);
      if (!isUserTypeValid) throw new Error('Wrong User Type');
      const token = await signToken(user._id);
      res.json({ status: 'ok', user: token });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error.message });
    }
  }
};
