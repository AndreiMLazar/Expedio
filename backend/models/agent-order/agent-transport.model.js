const mongoose = require("mongoose");

const AgentTransportSchema = mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  telephone: { type: String, required: true },
  cui: { type: String, required: true },
  address: { type: String, required: false },
  country: { type: String, required: true }
});

module.exports = AgentTransportSchema;

