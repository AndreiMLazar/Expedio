const mongoose = require("mongoose");

const TransportDetailsSchema = mongoose.Schema({
  transportDate: { type: String, required: true },
  fromAddress: { type: String, required: true },
  fromCountry: { type: String, required: true },
  toAddress: { type: String, required: true },
  toCountry: { type: String, required: true },
});

module.exports = TransportDetailsSchema;
