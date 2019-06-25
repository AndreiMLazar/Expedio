var ObjectId = require('mongodb').ObjectID;

// Notifications Model
const UserNotifications = require("../models/user-notifications.model");

exports.getUserNotifications = (req, res, next) => {
  let socket_id = [];
  const io = req.app.get('socketio');

  io.on('connection', socket => {
    socket_id.push(socket.id);
    if (socket_id[0] === socket.id) {
      io.removeAllListeners('connection');

      UserNotifications.watch().on('change', (newNotifications) => {
        io.emit('newNotifications', newNotifications.fullDocument);
      });

      io.on('connection', socket => {
        console.log(`Connected: ${socket}`);
      });
    }

  });
}
