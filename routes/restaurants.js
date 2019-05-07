const express = require('express');
const router = express.Router();
const axios = require('axios'); // to use the API
const User = require('../models/user');
const Favorite = require('../models/favorites');

// const feedPhoto = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=`;

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

      // for (var i = 0; i < restaurants.length; i++) {
      //   // console.log(restaurants[i].photos[0].photo_reference);
      //   newRestaurants.push({
      //     name: response.data.results[i].name,
      //     place_id: response.data.results[i].place_id,
      //     price_level: response.data.results[i].price_level,
      //     rating: response.data.results[i].rating,
      //     user_ratings_total: response.data.results[i].user_ratings_total,
      //     next_page_token: response.data.next_page_token,
      //     type: type,
      //     price: price,
      //     main_photo: `${feedPhoto}${response.data.results[i].photos[0].photo_reference}&key=${process.env.API_KEY}`
      //   });
      // }
      // console.log(price);

      newRestaurants.type = type;
      newRestaurants.price = price;
      newRestaurants.page = 0;
      newRestaurants.page = parseInt(page) + 1;
      newRestaurants.notfistPage = true;
      if (newRestaurants.page === 1) {
        newRestaurants.notfistPage = false;
      }

      if (parseInt(price) === 1) {
        // console.log('in');
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

      // console.log(newRestaurants.price1, newRestaurants.price2, newRestaurants.price3, newRestaurants.price4);

      for (var i = 0; i < newRestaurants.results.length; i++) {
        // console.log(restaurants[i].photos[0].photo_reference);
        // console.log(newRestaurants.results[i].photos[0].photo_reference);
      }

      res.render('restaurants/restaurant-list', { newRestaurants });
    })
    .catch(function (error) {
      console.log(error);
    });
});

/* GET restaurants listing. */
router.get('/details', (req, res, next) => {
  const { place_id } = req.query;
  // console.log(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${process.env.API_KEY}`);
  axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=AIzaSyCjoxAmGGvyGMVLx8jHkzSQTdfz8F1rknw`)
    .then(function (response) {
      const restaurantDetails = response.data.result;
      // const userId = req.session.currentUser._id;
      // Favorite.findById(place_id);
      // console.log(restaurantDetails);
      res.render('restaurants/restaurant-details', { restaurantDetails });
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
