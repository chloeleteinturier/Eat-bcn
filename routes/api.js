const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorites');
const User = require('../models/user');

router.use((req, res, next) => {
  if (req.session.currentUser) {
    console.log('connected');
    next();
  } else {
    console.log('no connected');
    res.redirect('/login');
  }
});

router.post('/', (req, res, next) => {
  const { placeId, status } = req.body;

  if (req.session.currentUser) {
    if (status === 'off') {
      Favorite.create({ place_id: placeId })
        .then((favorite) => {
          const favoriteId = favorite._id;

          const userId = req.session.currentUser._id;
          console.log('userId', userId);
          console.log('favoriteId', favoriteId);
          return User.findOneAndUpdate({ _id: userId }, { $push: { favorites: favoriteId } })
            .then(() => {
              res.json({ message: 'done' }).status(200);
            });
        })
        .catch((err) => next(err));
    } else {
      console.log('deleeeeeeeete');
      const userId = req.session.currentUser._id;
      return Favorite.find({ place_id: placeId })
        .then((favorites) => {
          Promise.all(favorites.map((element) => {
            return User.findByIdAndUpdate(userId, { $pull: { favorites: element._id } });
          }))
            .then((response) => {
              console.log(response);
              res.json({ message: 'done' }).status(200);
            });
        })
        .catch(next);
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
