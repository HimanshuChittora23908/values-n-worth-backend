const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/generateToken', userController.generateToken);
router.post('/createUser', userController.createUser);

module.exports = router;