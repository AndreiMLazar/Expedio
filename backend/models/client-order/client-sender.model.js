const mongoose = require("mongoose");

const ClientSenderSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  cnp: { type: Number, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  instructions: { type: String, required: false }
});

module.exports = ClientSenderSchema;
