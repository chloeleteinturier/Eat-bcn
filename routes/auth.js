var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// GET '/signup' page
router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
  } else {
    const data = {
      messages: req.flash('message-name')
    };
    res.render('auth/signup', data);
  }
});

// POST '/signup' page
router.post('/signup', (req, res, next) => {
  const { name, email, password } = req.body;

  if (name === '' || email === '' || password === '') {
    req.flash('message-name', 'Please, enter your name, email and password');
    return res.redirect('/signup');
  }

  User.findOne({ email })
    .then((user) => {
      if (user !== null) {
        req.flash('message-name', 'Email already taken');
        return res.redirect('/signup');
      }

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
router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
  } else {
    const data = {
      messages: req.flash('message-name')
    };
    res.render('auth/login', data);
  }
});

// POST '/login' page
router.post('/login', (req, res, next) => {
  const thePassword = req.body.password;
  const theEmail = req.body.email;

  if (thePassword === '' || theEmail === '') {
    req.flash('message-name', 'Please, enter your email and password');
    return res.redirect('/login');
  }
  User.findOne({ 'email': theEmail })
    .then((user) => {
      if (!user) {
        req.flash('message-name', 'The email doesn\'t exist');
        return res.redirect('/login');
      }

      const passwordCorrect = bcrypt.compareSync(thePassword, user.password);

      if (passwordCorrect) {
        req.session.currentUser = user;
        res.redirect('/favorites');
      } else {
        req.flash('message-name', 'Password incorrect');
        res.redirect('/login');
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
