const express = require('express');
const router = express.Router();
const axios = require('axios'); // to use the API
const User = require('../models/user');
const Favorite = require('../models/favorites');

/* GET restaurants listing. */
router.get('/', (req, res, next) => {
  const { type, price, pagetoken, page } = req.query;

  let pagetokenParam = '';
  if (pagetoken !== undefined) {
    pagetokenParam = 'pagetoken=' + pagetoken + '&';
  }

  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?page=${page}&${pagetokenParam}maxprice=${price}&minprice=${price}&keyword=${type}&location=41.387098,%202.165746&radius=5000&type=restaurant&key=AIzaSyCjoxAmGGvyGMVLx8jHkzSQTdfz8F1rknw`)
    .then(function (response) {
      const newRestaurants = response.data;

      newRestaurants.type = type;
      newRestaurants.price = price;
      newRestaurants.page = 0;
      newRestaurants.page = parseInt(page) + 1;
      newRestaurants.notfistPage = true;
      if (newRestaurants.page === 1) {
        newRestaurants.notfistPage = false;
      }

      if (parseInt(price) === 1) {
        newRestaurants.price1 = true;
        newRestaurants.price2 = false;
        newRestaurants.price3 = false;
        newRestaurants.price4 = false;
      } else if (parseInt(price) === 2) {
        newRestaurants.price1 = false;
        newRestaurants.price2 = true;
        newRestaurants.price3 = false;
        newRestaurants.price4 = false;
      } else if (parseInt(price) === 3) {
        newRestaurants.price1 = false;
        newRestaurants.price2 = false;
        newRestaurants.price3 = true;
        newRestaurants.price4 = false;
      } else if (parseInt(price) === 4) {
        newRestaurants.price1 = false;
        newRestaurants.price2 = false;
        newRestaurants.price3 = false;
        newRestaurants.price4 = true;
      }

      res.render('restaurants/restaurant-list', { newRestaurants });
    })
    .catch(function (error) {
      next(error);
    });
});

/* GET restaurants listing. */
router.get('/details', (req, res, next) => {
  const { place_id } = req.query;

  axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=AIzaSyCjoxAmGGvyGMVLx8jHkzSQTdfz8F1rknw`)
    .then(function (response) {
      const restaurantDetails = response.data.result;
      const userId = req.session.currentUser._id;
      let favoriteStatus;

      User.find({ _id: userId }, { favorites: 1, _id: 0 })
      // .then((user) => {
      //   Promise.all(user[0].favorites.map((element) => {
      //     return User.find({ _id: userId }, { favorites: element });
      //   }))

        .then((user) => {
          if (user) {
            console.log('user[0].favorites', user[0].favorites);
            console.log('user[0].favorites.length', user[0].favorites.length);
            // console.log('user', user);

            favoriteStatus = 'on';
          } else {
            // console.log('user[0].favorites', user[0].favorites);
            // console.log('user[0].favorites.length', user[0].favorites.length);
            console.log('user', user);

            favoriteStatus = 'off';
          }

          console.log('favoriteStatus', favoriteStatus);

          const data = {
            restaurantDetails,
            favoriteStatus
          };
          res.render('restaurants/restaurant-details', data);
        });
      // });
    })
    .catch(function (error) {
      next(error);
    });
});

module.exports = router;

// Favorite.find({ place_id })
// .then((favorites) => {
//   Promise.all(favorites.map((element) => {
//     return User.find({ _id: userId }, { favorites: element._id });
//   }))
//     .then((user) => {
//       if (user.length) {
//         console.log('user.length', user.length);

//         favoriteStatus = 'on';
//       } else {
//         console.log('user.length', user.length);

//         favoriteStatus = 'off';
//       }
//       console.log('user', user);

//       console.log('favoriteStatus', favoriteStatus);

//       const data = {
//         restaurantDetails,
//         favoriteStatus
//       };
//       res.render('restaurants/restaurant-details', data);
//     });
// });
