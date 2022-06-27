const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.get('/getTodos', todoController.getTodos);
router.post('/addTodo', todoController.addTodo);
router.put('/updateTodo', todoController.updateTodo);
router.delete('/deleteTodo', todoController.deleteTodo);

module.exports = router;