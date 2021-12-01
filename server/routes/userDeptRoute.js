const express = require('express');
const router = express.Router();

const UserDeptController = require('../controllers/UserDeptController');

router.get('/userId', UserDeptController.apiGetDeptsbyUserId);
router.get('/deptId', UserDeptController.apiGetUsersbyDeptId);
router.get('/', UserDeptController.apiGetAllUserDepts);
router.post('/', UserDeptController.apiCreateUserDept);
router.delete('/', UserDeptController.apiDeleteUserDept);

module.exports = router;
