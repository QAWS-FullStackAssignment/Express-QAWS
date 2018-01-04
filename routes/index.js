var express = require('express');
var password = require('../bin/password');

//Controllers
var auth = require('../controllers/authController');

//Initialize Router
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'QA_WD' });
});
/* Login To App */
router.post('/login', auth.login)
/* Logout From App */
router.use('/logout', password)
router.delete('/logout', auth.logout)

module.exports = router;
