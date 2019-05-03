var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET login page. */
router.get('/login', (req, res, next) => res.render('auth/login'));

/* GET login page. */
router.get('/signup',(req, res, next) => res.render('auth/signup'));


module.exports = router;
