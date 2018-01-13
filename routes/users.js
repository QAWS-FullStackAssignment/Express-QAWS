var express = require('express');
var Password = require('../bin/password');
var router = express.Router();

//Controllers
var userController = require('../controllers/userController')

// router.use('/', Password)

/* GET users listing. */
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/signup', userController.signup);
// router.post('/signup', (req, res) => {
//     console.log(req.body)
// });




module.exports = router;
