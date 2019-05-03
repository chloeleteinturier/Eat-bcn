var express = require('express');
var router = express.Router();

/* GET edit profile form . */
router.get('/edit-profile', function(req, res, next) {
  res.render('private/edit-profile');
});

/* GET list of favorites. */
router.get('/favorites', function(req, res, next) {
  res.render('private/favorites');
});



module.exports = router;
