// Order Model
const Order = require("../models/order.model");
const Notifications = require("../models/user-notifications.model");
const Notification = require("../models/notification/notification.model");
const randomstring = require("randomstring");

exports.createClientOrder = (req, res, next) => {
  let notificationNumber = randomstring.generate({
    charset: 'numeric',
    length: 10
  });
  const notification = new Notification({
    _id: notificationNumber,
    message: `Order 5 was created`,
    type: 'succeed'
  });

  const userNotification = new Notifications({
    _id: req.body.sender.email,
    notificationsList: notification
  });

  Notifications.findOne({ _id: req.body.sender.email })
    .then(exists => {
      console.log(exists);
      if (!exists) {
        userNotification.save();
      } else {
        Notifications.findOneAndUpdate({ _id: req.body.sender.email }, {
          $push: {
            notificationsList: notification
          }
        });
      };
    });

  // Notifications.updateOne({ _id: req.body.sender.email }, userNotification, { upsert: true }, (err, doc) => {
  //   console.log(err);
  //   console.log(doc);
  // });




  // Notifications.update({_id: req.body.sender.email}, userNotification, { upsert: true, setDefaultsOnInsert: true, new: true });

  // Notifications.find({ _id: req.body.sender.email }, function(err, userNotification) {
  //   userNotification.notificationsList = [...userNotification.notificationsList, notification]

  // }, { upsert: true, setDefaultsOnInsert: true, new: true });
  // let awbGeneratedNumber = randomstring.generate({
  //   capitalization: 'uppercase',
  //   charset: 'alphanumeric',
  //   length: 16
  // });
  // const newOrder = new Order({
  //   sender: req.body.sender,
  //   recipient: req.body.recipient,
  //   loadingPlace: req.body.loadingPlace,
  //   deposit: req.body.deposit,
  //   packagesList: req.body.packagesList,
  //   awb: awbGeneratedNumber
  // });
  // newOrder.save().then(createdOrder => {

  //   res.status(201).json({
  //     message: "Order created"
  //   });
  // }).catch(err => {
  //   console.log(err);
  //   return res.status(500).json({
  //     message: "Error creating order"
  //   });
  // });
}

exports.showClientOrders = (req, res, next) => {
  Order.find({ "sender.email": req.params.id })
    .then(order => {
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ message: "You have no orders yet" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching order failed"
      });
    });
}

exports.getOrder = (req, res, next) => {
  Order.find({ "awb": req.params.awb })
    .then(order => {
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ message: "Order does not exist" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching order failed"
      });
    });
}
