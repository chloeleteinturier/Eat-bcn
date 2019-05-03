var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

/* GET login page. */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});


module.exports = router;
