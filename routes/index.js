const express = require('express');
const router = express.Router();
const restaurantsRouter = require('./restaurants');
const authRouter = require('./auth');
const apiRouter = require('./api');

//  * '/'
router.use('/api', apiRouter);

//  * '/restaurants'
router.use('/restaurants', restaurantsRouter);

//  * '/'
router.use('/', authRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    let currentUser = true;
    res.render('index', { currentUser, name: req.session.currentUser.name });
  } else {
    res.render('index');
  }
});

module.exports = router;
