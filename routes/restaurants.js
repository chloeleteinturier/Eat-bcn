const express = require('express');
const router = express.Router();




/* GET restaurants listing. */
router.get('/', (req, res, next) => {
  //console.log(process.env);
  console.log(`Your API key is: ${process.env.API_KEY}`);

  res.render('restaurants/restaurant-list');
});

/* GET restaurants listing. */
router.get('/details', (req, res, next) => {
  res.render('restaurants/restaurant-details');
});


module.exports = router;

