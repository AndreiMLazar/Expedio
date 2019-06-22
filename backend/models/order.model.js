const mongoose = require("mongoose");

var Sender = require('./client-order/sender.model');
var Recipient = require('./client-order/recipient.model');
var LoadingPlace = require('./client-order/loading-place.model');
var Deposit = require('./client-order/deposit.model');
var Package = require('./client-order/package.model').schema;

const ClientOrderSchema = mongoose.Schema({
  awb: { type: String, required: true },
  sender: { type: Sender, required: true },
  recipient: { type: Recipient, required: true },
  loadingPlace: { type: LoadingPlace, required: true },
  deposit: { type: Deposit, required: true },
  packagesList: [{ type: mongoose.Schema.Types.Object, ref: 'Package', required: true }]
});

module.exports = mongoose.model("client-orders", ClientOrderSchema);
