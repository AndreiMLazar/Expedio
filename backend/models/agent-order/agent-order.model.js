const mongoose = require("mongoose");

var AgentSender = require('./agent-sender.model');
var AgentRecipient = require('./agent-recipient.model');
var AgentTransport = require('./agent-transport.model');
var Package = require('../package.model').schema;

const AgentOrderSchema = mongoose.Schema({
  creator: { type: String, required: true },
  awb: { type: String, required: true },
  createdDate: { type: Date, required: true },
  sender: { type: AgentSender, required: true },
  recipient: { type: AgentRecipient, required: true },
  transport: { type: AgentTransport, required: true },
  packagesList: [{ type: mongoose.Schema.Types.Object, ref: 'Package', required: true }]
});

module.exports = mongoose.model("agent-orders", AgentOrderSchema);
