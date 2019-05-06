var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// GET '/signup' page
router.get('/signup', (req, res, next) => res.render('auth/signup'));

// POST '/signup' page
router.post('/signup', (req, res, next) => {
  const { name, email, password } = req.body;

  if (name === '' || email === '' || password === '') {
    return res.redirect('/signup');
  }

  User.findOne({ email })
    .then((user) => {
      if (user !== null) return res.redirect('/signup');

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({ name, email, password: hashedPassword })
        .then((user) => {
          req.session.currentUser = user;
          res.redirect('/favorites');
        })
        .catch((err) => next(err));
    })

    .catch((err) => next(err));
});

// GET '/login' page
router.get('/login', (req, res, next) => res.render('auth/login'));

// POST '/login' page
router.post('/login', (req, res, next) => {
  const thePassword = req.body.password;
  const theEmail = req.body.email;

  if (thePassword === '' || theEmail === '') {
    return res.redirect('/login');
  }
  User.findOne({ 'email': theEmail })
    .then((user) => {
      if (!user) {
        return res.redirect('/login');
      }

      const passwordCorrect = bcrypt.compareSync(thePassword, user.password);

      if (passwordCorrect) {
        req.session.currentUser = user;
        res.redirect('/favorites');
      } else res.redirect('/login');
    })
    .catch((err) => next(err));
});

module.exports = router;
