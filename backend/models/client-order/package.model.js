const mongoose = require("mongoose");

const PackageSchema = mongoose.Schema({
  mode: { type: String, required: true, unique: true, sparse: true },
  type: { type: String, required: true, unique: true, sparse: true },
  weight: { type: Number, required: true, unique: true, sparse: true },
  volume: { type: Number, required: true, unique: true, sparse: true }
});

module.exports = mongoose.model('Package', PackageSchema);
