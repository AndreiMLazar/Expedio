const mongoose = require("mongoose");

var Sender = require('./client-command/sender.model');
var Recipient = require('./client-command/recipient.model');
var LoadingPlace = require('./client-command/loading-place.model');
var Deposit = require('./client-command/deposit.model');
var Package = require('./client-command/package.model').schema;

const ClientCommandSchema = mongoose.Schema({
  awb: { type: String, required: true },
  sender: { type: Sender, required: true },
  recipient: { type: Recipient, required: true },
  loadingPlace: { type: LoadingPlace, required: true },
  deposit: { type: Deposit, required: true },
  packagesList: [{ type: mongoose.Schema.Types.Object, ref: 'Package', required: true, unique: true, sparse: true }]
});

module.exports = mongoose.model("Client Commands", ClientCommandSchema);
