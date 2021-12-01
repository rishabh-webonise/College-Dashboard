const express = require('express');
const router = express.Router();

const DeptController = require('../controllers/DeptController');

router.get('/all', DeptController.apiGetAllDepts);
router.get('/:id', DeptController.apiGetDeptByUserId);
router.get('/:id', DeptController.apiGetDeptById);
router.get('/', DeptController.apiGetDeptsTable);
router.post('/', DeptController.apiCreateDept);
router.delete('/:id', DeptController.apiDeleteDept);

module.exports = router;
