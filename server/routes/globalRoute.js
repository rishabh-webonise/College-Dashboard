const express = require('express');
const router = express.Router();

const GlobalController = require('../controllers/GlobalController');

router.post('/login', GlobalController.apiLogin);

module.exports = router;
