const express = require('express');
const router = express.Router();
const axios = require('axios'); // to use the API

const feedPhoto = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=`;

/* GET restaurants listing. */
router.get('/', (req, res, next) => {
  const { type, price } = req.query;

  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?maxprice=${price}&minprice=${price}&keyword=${type}&location=41.387098,%202.165746&radius=5000&type=restaurant&key=${process.env.API_KEY}`)
    .then(function (response) {
      // console.log(response.data.results[0].photos[0].photo_reference);
      // const restaurants = response.data.results;
      // for (var i = 0; i < restaurants.length; i++) {
      //   console.log(restaurants[i].photos[0].photo_reference);
      // }

      const restaurants = response.data.results;
      const newRestaurants = [];

      for (var i = 0; i < restaurants.length; i++) {
        // console.log(restaurants[i].photos[0].photo_reference);
        newRestaurants.push({
          name: response.data.results[i].name,
          place_id: response.data.results[i].place_id,
          price_level: response.data.results[i].price_level,
          rating: response.data.results[i].rating,
          user_ratings_total: response.data.results[i].user_ratings_total,
          next_page_token: response.data.next_page_token,
          type: type,
          price: price,
          main_photo: `${feedPhoto}${response.data.results[i].photos[0].photo_reference}&key=${process.env.API_KEY}`
        });
      }

      // for (var i = 0; i < newRestaurants.length; i++) {
      //   // console.log(newRestaurants[i].photosArr);
      //   for (var j = 0; j < newRestaurants[i].photosArr.length; j++) {
      //     // console.log(newRestaurants[i].photosArr[j].photo_reference);
      //     newRestaurants.push({
      //       photo_reference: newRestaurants[i].photosArr[j].photo_reference
      //     });
      //   }
      // }

      // let imageURLPromises = response.data.results.map((result) => {
      //   // console.log(`${feedPhoto}${result.photos[0].photo_reference}&key=${process.env.API_KEY}`);
      //   axios.get(`${feedPhoto}${result.photos[0].photo_reference}&key=${process.env.API_KEY}`);
      //   // return axios.get(`${feedPhoto}${result.photos[0].photo_reference}&key=${process.env.API_KEY}`);
      // });

      console.log(newRestaurants);
      // return newRestaurants;
      res.render('restaurants/restaurant-list', { newRestaurants });
    })
    // .then((newRestaurants) => Promise.all(newRestaurants))
    // .then((newRestaurants) => {
    //   res.render('restaurants/restaurant-list', { newRestaurants });
    // })
    .catch(function (error) {
      console.log(error);
    });
});

/* GET restaurants listing. */
router.get('/details', (req, res, next) => {
  const { place_id } = req.query;
  // console.log(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${process.env.API_KEY}`);
  axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${process.env.API_KEY}`)
    .then(function (response) {
      const restaurantDetails = response.data.result;
      // console.log(restaurantDetails);
      res.render('restaurants/restaurant-details', { restaurantDetails });
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
