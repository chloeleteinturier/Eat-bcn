const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorites');

router.post('/', (req, res, next) => {
  const { placeId, status } = req.body;


  if(status === "off"){
    Favorite.create({ place_id: placeId })
    .catch((err) => next(err));
  }else{
    // do the delete when we know what user is
  }

  
});




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

module.exports = router;
