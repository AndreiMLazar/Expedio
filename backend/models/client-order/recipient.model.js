const mongoose = require("mongoose");

const RecipientSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  cnp: { type: Number, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true }
});

module.exports = RecipientSchema;
