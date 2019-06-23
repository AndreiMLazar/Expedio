var ObjectId = require('mongodb').ObjectID;

// Notifications Model
const UserNotifications = require("../models/user-notifications.model");

exports.getUserNotifications = (req, res, next) => {
  console.log('1');
  let socket_id = [];
  const io = req.app.get('socketio');

  io.on('connection', socket => {
    socket_id.push(socket.id);
    if (socket_id[0] === socket.id) {
      io.removeAllListeners('connection');

      console.log(socket_id);

      UserNotifications.watch().on('change', (newNotifications) => {
        console.log(newNotifications.fullDocument);
        io.emit('newNotifications', newNotifications.fullDocument);
      });

      io.on('connection', socket => {
        console.log(`Connected: ${socket_id}`);
      });
    }

    // socket.on('hello message', msg => {
    //   console.log('just got: ', msg);
    //   socket.emit('chat message', 'hi from server');
    // });

  });
}
