//___________________
//Dependencies
//___________________
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Restaurants = require("./modules/restaruants");
const cors = require("cors");
const db = mongoose.connection;
require("dotenv").config();
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static("public"));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project
app.use(cors());
//___________________
// Routes
//___________________
//localhost:3000
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/restaurants", (req, res) => {
  Restaurants.find({})
    .sort({ restName: 1 })
    .then((foundRestaurants) => {
      res.json(foundRestaurants);
    });
});

app.put("/restaurants/:id", (req, res) => {
  Restaurants.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedRestaurant) => res.json(updatedRestaurant)
  );
});

app.post("/restaurants", (req, res) => {
  Restaurants.create(req.body).then((createdRestaurant) => {
    res.json(createdRestaurant);
  });
});

app.delete("/restaurants/:id", (req, res) => {
  Restaurants.findByIdAndDelete(req.params.id).then((deletedRestaurant) => {
    res.json(deletedRestaurant);
  });
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("Listening on port:", PORT));

mongoose.connection.once("open", () => {
  console.log("connection with god established...");
});
