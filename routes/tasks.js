var express = require('express');
var password = require('../bin/password');

//Controllers
var taskController = require('../controllers/taskController');

//Initialize Router
var router = express.Router();
router.use('/', password)

/* GET home page. */
router.get('/todo/:userId', taskController.getTodo);
router.get('/assigned/:userId', taskController.getAssigned);
router.post('/create', taskController.createTask);
router.put('/updateTask/:taskId', taskController.startTask);

module.exports = router;