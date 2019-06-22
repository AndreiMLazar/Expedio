const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, required: true }
});

module.exports = mongoose.model("notification", NotificationSchema);
