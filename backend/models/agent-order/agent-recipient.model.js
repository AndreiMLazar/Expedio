const mongoose = require("mongoose");

const AgentRecipientSchema = mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  telephone: { type: String, required: true },
  cnp: { type: Number, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true }
});

module.exports = AgentRecipientSchema;
