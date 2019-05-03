var express = require('express');
var router = express.Router();

/* GET restaurants listing. */
router.get('/', function(req, res, next) {
  res.render('restaurants/restaurant-list');
});

/* GET restaurants listing. */
router.get('/details', function(req, res, next) {
  res.render('restaurants/restaurant-details');
});


module.exports = router;

