const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  restName: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  restImg: String,
  foodImg: [{ type: String }],
  ranking: String,
  price: String,
  cuisine: String,
});

const Restaurants = mongoose.model("Restaurants", restaurantSchema);
module.exports = Restaurants;
