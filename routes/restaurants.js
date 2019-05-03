const express = require('express');
const router = express.Router();
const axios = require('axios'); // to use the API

/* GET restaurants listing. */
router.get('/', function (req, res, next) {
  // console.log(process.env);
  // console.log(`Your API key is: ${process.env.API_KEY}`);
  // axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=chino&location=41.387098,%202.165746&radius=5000&type=restaurant&keyword=cruise&key=${process.env.API_KEY}`);

  // res.render('restaurants/restaurant-list', { restaurants: res.data });
});

/* GET restaurants listing. */
router.get('/details', function (req, res, next) {
  res.render('restaurants/restaurant-details');
});

module.exports = router;
