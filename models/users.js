const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  favorites: [FavoriteID],
});

const User = mongoose.model("User", userSchema);

module.exports = User;