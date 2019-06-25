const mongoose = require("mongoose");

var ClientSender = require('./client-sender.model');
var Recipient = require('./recipient.model');
var LoadingPlace = require('./loading-place.model');
var Deposit = require('./deposit.model');
var Package = require('../package.model').schema;

const ClientOrderSchema = mongoose.Schema({
  creator: { type: String, required: true },
  awb: { type: String, required: true },
  createdDate: { type: Date, required: true },
  sender: { type: ClientSender, required: true },
  recipient: { type: Recipient, required: true },
  loadingPlace: { type: LoadingPlace, required: true },
  deposit: { type: Deposit, required: true },
  packagesList: [{ type: mongoose.Schema.Types.Object, ref: 'Package', required: true }]
});

module.exports = mongoose.model("client-orders", ClientOrderSchema);
