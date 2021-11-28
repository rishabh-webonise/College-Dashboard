const express = require('express');
const router = express.Router();

const DeptController = require('../controllers/DeptController');

router.get('/', DeptController.apiGetAllDepts);
router.post('/', DeptController.apiCreateDept);
router.get('/:id', DeptController.apiGetDeptById);
router.put('/:id', DeptController.apiUpdateDeptStudents);
router.delete('/:id', DeptController.apiDeleteDept);

module.exports = router;
