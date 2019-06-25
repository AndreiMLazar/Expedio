const mongoose = require("mongoose");

var TransportDetails = require('./transport-details.model');
var CompanySender = require('./company-sender.model');
var Package = require('./truck.model').schema;

const CompanyOrderSchema = mongoose.Schema({
  creator: { type: String, required: true },
  createdDate: { type: Date, required: true },
  instructions: { type: String, required: false },
  transportDetails: { type: TransportDetails, required: true },
  sender: { type: CompanySender, required: true },
  trucks: [{ type: mongoose.Schema.Types.Object, ref: 'Truck', required: true }]
});

module.exports = mongoose.model("company-orders", CompanyOrderSchema);
