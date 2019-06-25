const mongoose = require("mongoose");

const AgentSenderSchema = mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  telephone: { type: String, required: true },
  company: { type: String, required: false },
  cnp: { type: Number, required: true },
  cui: { type: String, required: false },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = AgentSenderSchema;
