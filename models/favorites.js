const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.set('useFindAndModify', false);

const favoriteSchema = new Schema({
  place_id: String,
  
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
