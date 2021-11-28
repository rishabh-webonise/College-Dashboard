const DeptService = require('../services/DeptService');
const { verifyToken } = require('../services/AuthService');

module.exports = class DeptController {
  static async apiGetAllDepts(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      const Depts = await DeptService.getAllDepts();
      res.json({ status: 'ok', departments: Depts });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: 'Invalid token' });
    }
  }

  static async apiGetDeptById(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      let id = req.params.id || {};
      const Dept = await DeptService.getDeptbyId(id);
      res.json({ status: 'ok', department: Dept });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: 'Invalid token' });
    }
  }

  static async apiCreateDept(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      const createdDept = await DeptService.createDept(req.body);
      res.json({ status: 'ok', department: createdDept });
    } catch (error) {
      res.json({ status: 'error', error: 'An department with this name already exists!' });
    }
  }

  static async apiUpdateDeptStudents(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      const updatedDept = await DeptService.updateDeptStudents(req.params.id, req.body.students);
      if (updatedDept.modifiedCount === 0) throw new Error('Unable to update Dept, error occurred!');
      res.json({ status: 'ok', department: updatedDept });
    } catch (error) {
      res.json({ status: 'error', error: 'Invalid request' });
    }
  }

  static async apiDeleteDept(req, res, next) {
    try {
      const tokenId = await verifyToken(req.headers['x-access-token']);
      if (tokenId === 'Invalid') throw new Error('Invalid Token!');
      const deleteResponse = await DeptService.deleteDept(req.params.id);
      res.json({ status: 'ok', department: deleteResponse });
    } catch (error) {
      res.json({ status: 'error', error: 'Dept could not be deleted' });
    }
  }
};
