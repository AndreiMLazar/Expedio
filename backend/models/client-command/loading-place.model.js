const mongoose = require("mongoose");

const LoadingPlaceSchema = mongoose.Schema({
  address: { type: String, required: true },
  country: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = LoadingPlaceSchema;
