const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/all', UserController.apiGetAllUsers);
router.get('/:id', UserController.apiGetUserById);
router.get('/', UserController.apiGetUsersTable);
router.post('/', UserController.apiCreateUser);
router.delete('/:id', UserController.apiDeleteUser);

module.exports = router;
