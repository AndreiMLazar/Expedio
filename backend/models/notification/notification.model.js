const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
  id: { type: Number, required: true },
  message: { type: String, required: true },
  type: { type: String, required: true }
});

module.exports = mongoose.model("notification", NotificationSchema);
