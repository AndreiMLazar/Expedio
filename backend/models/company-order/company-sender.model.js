const mongoose = require("mongoose");

const CompanySenderSchema = mongoose.Schema({
  email: { type: String, required: true },
  company: { type: String, required: true },
  address: { type: String, required: true },
  cui: { type: String, required: false },
  country: { type: String, required: true }
});

module.exports = CompanySenderSchema;
