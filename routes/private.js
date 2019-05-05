var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
  console.log('req.path', req.path);

  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {
    res.redirect('/login');
  }
});

/* GET edit profile form . */
router.get('/edit-profile', (req, res, next) => res.render('private/edit-profile'));

/* GET list of favorites. */
router.get('/favorites', (req, res, next) => {
  console.log('req.session.currentUser');

  res.render('private/favorites', { name: req.session.currentUser.name });
});

module.exports = router;
