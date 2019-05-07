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
    res.render('index', { title: `Eat.bcn - ${req.session.currentUser.name} `, currentUser });
  } else {
    res.render('index', { title: 'Eat.bcn' });
  }
});

module.exports = router;
