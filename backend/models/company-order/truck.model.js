const mongoose = require("mongoose");

const TruckSchema = mongoose.Schema({
  type: { type: String, required: true },
  availablePallets: { type: Number, required: true },
});

module.exports = TruckSchema
