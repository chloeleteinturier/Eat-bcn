const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  favorites: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
