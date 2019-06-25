const mongoose = require("mongoose");

const PackageSchema = mongoose.Schema({
  mode: { type: String, required: true },
  type: { type: String, required: true },
  weight: { type: Number, required: true },
  volume: { type: Number, required: true }
});

module.exports = PackageSchema
