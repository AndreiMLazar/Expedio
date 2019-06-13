const mongoose = require("mongoose");

const DepositSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true }
});

module.exports = DepositSchema;
