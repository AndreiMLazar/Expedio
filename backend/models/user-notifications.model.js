const mongoose = require("mongoose");
var Notification = require('./notification/notification.model').schema;

const NotificationsSchema = mongoose.Schema({
  _id: { type: String, required: true },
  notificationsList: [{ type: mongoose.Schema.Types.Object, ref: 'Notification', required: true }]
});

module.exports = mongoose.model("notifications", NotificationsSchema);
