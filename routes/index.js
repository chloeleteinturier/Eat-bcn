const express = require('express');
const router = express.Router();
const restaurantsRouter = require('./restaurants');
const authRouter = require('./auth');

//  * '/restaurants'
router.use('/restaurants', restaurantsRouter);

//  * '/'
router.use('/', authRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    let currentUser = true;
    res.render('index', { title: 'Express', currentUser, name: req.session.currentUser.name });
  } else {
    res.render('index', { title: 'Express' });
  }
});

module.exports = router;
