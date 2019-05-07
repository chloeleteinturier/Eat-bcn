const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorites');

 
router.use((req,res, next) => {
  if(req.session.currentUser){
    console.log("connected")
    next();
  }else{
    console.log("no connected")
    res.redirect('/login');
  }
})


router.post('/', (req, res, next) => {
  const { placeId, status } = req.body;

  console.log(req.session.currentUser);

  if(status === "off"){
    Favorite.create({ place_id: placeId })
    .catch((err) => next(err));
  }else{
    // do the delete when we know what user is
  }

  
});





module.exports = router;
