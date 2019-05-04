const express = require('express');
const router = express.Router();
const restaurantsRouter = require('./restaurants');
const authRouter = require('./auth');

//  * '/restaurants'
router.use('/restaurants', restaurantsRouter);

//  * '/'
router.use('/', authRouter);

/* GET home page. */
router.get('/', (req, res, next) => res.render('index', { title: 'Express' }));

module.exports = router;
