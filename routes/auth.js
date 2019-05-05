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
    return res.render('auth/signup', { errorMessage: 'Please indicate your name, email and password' });
  }

  User.findOne({ email })
    .then((user) => {
      if (user !== null) return res.render('auth/signup', { errorMessage: 'Email already used' });

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({ name, email, password: hashedPassword })
        .then(() => res.render('private/favorites'))
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
    return res.render('auth/login', { errorMessage: 'Please indicate your email and password' });
  }
  User.findOne({ 'email': theEmail })
    .then((user) => {
      if (!user) {
        return res.render('auth/login', { errorMessage: 'The email doesn\'t exist.' });
      }
      console.log('user', user);

      const passwordCorrect = bcrypt.compareSync(thePassword, user.password);

      if (passwordCorrect) {
        req.session.currentUser = user;
        res.redirect('/favorites');
      } else res.render('auth/login', { errorMessage: 'Incorrect password' });
    })

    .catch((err) => next(err));
});

module.exports = router;
