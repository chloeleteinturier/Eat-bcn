var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use((req, res, next) => {
  console.log('req.session.currentUser', req.session.currentUser);

  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/login');
  }
});

// AVOID GET '/login' if already connected
router.get('/login', (req, res, next) => {
  res.render('private/favorites', { name: req.session.currentUser.name });
});

/* GET list of favorites. */
router.get('/favorites', (req, res, next) => {
  res.render('private/favorites', { name: req.session.currentUser.name });
});

/* GET edit profile form . */
router.get('/edit-profile', (req, res, next) => {
  const { _id } = req.session.currentUser;
  User.findById(_id)
    .then((user) => res.render('private/edit-profile', { user }))
    .catch((err) => next(err));
});

/* POST edit profile form . */
router.post('/edit-profile', (req, res, next) => {
  const { _id } = req.query;
  const newName = req.body.name;
  const newEmail = req.body.email;
  const currentPassword = req.body.password;
  const newPassword = req.body.newPassword;

  // const currentUser = req.session.currentUser;
  if (newName === '' || newEmail === '' || currentPassword === '') {
    User.findById(_id)
      .then((user) => res.redirect('/edit-profile'))
      .catch((err) => next(err));
  }

  User.findOne({ 'email': newEmail })
    .then((user) => {
      if (user.email !== req.session.currentUser.email && user.email !== null) {
        return res.redirect('private/edit-profile');
      }
    })
    .catch((err) => next(err));

  User.findById(_id)
    .then((user) => {
      const passwordCorrect = bcrypt.compareSync(currentPassword, req.session.currentUser.password);

      if (passwordCorrect) {
        if (newPassword !== '') {
          const salt = bcrypt.genSaltSync(saltRounds);
          const newHashedPassword = bcrypt.hashSync(newPassword, salt);
          return User.findOneAndUpdate({ _id }, { $set: { name: newName, email: newEmail, password: newHashedPassword } })
            .then((user) => {
              req.session.currentUser = user;
              res.redirect('/favorites');
            })
            .catch((err) => next(err));
        }

        if (newPassword === '') {
          User.findOneAndUpdate({ _id }, { $set: { name: newName, email: newEmail } }, { new: true })
            .then((user) => {
              req.session.currentUser = user;
              res.redirect('/favorites');
            })
            .catch((err) => next(err));
        }
      } else res.redirect('/edit-profile');
    })
    .catch((err) => next(err));
});

// GET 'logout'
router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    } else {
      return res.redirect('/');
    }
  });
});

module.exports = router;
