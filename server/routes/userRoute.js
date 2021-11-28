const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/', UserController.apiGetAllUsers);
router.post('/', UserController.apiCreateUser);
router.get('/:id', UserController.apiGetUserById);
router.put('/:id', UserController.apiUpdateUserDepartments);
router.delete('/:id', UserController.apiDeleteUser);

module.exports = router;
