const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserService = require('../services/UserService');

const SECRET_KEY = process.env.SECRET_KEY || 'secret123#';

exports.verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await UserService.getUserbyId(decoded._id);
    if (!user) throw new Error('Invalid');
    return user._id;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.encryptPassword = async (password) => {
  const newPassword = await bcrypt.hash(password, 10);
  return newPassword;
};

exports.checkPassword = async (enteredPassword, storedPassword) => {
  const isPasswordValid = await bcrypt.compare(enteredPassword, storedPassword);
  return isPasswordValid;
};

exports.checkUserType = (enteredUserType, storedUserType) => {
  return enteredUserType === storedUserType;
};

exports.signToken = (UserId) => {
  const token = jwt.sign({ _id: UserId }, SECRET_KEY);
  return token;
};
