// Order Model
const Order = require("../models/order.model");
const Notifications = require("../models/user-notifications.model");
const randomstring = require("randomstring");

exports.createClientOrder = (req, res, next) => {
  let awbGeneratedNumber = randomstring.generate({
    capitalization: 'uppercase',
    charset: 'alphanumeric',
    length: 16
  })
  console.log(awbGeneratedNumber);
  const newOrder = new Order({
    sender: req.body.sender,
    recipient: req.body.recipient,
    loadingPlace: req.body.loadingPlace,
    deposit: req.body.deposit,
    packagesList: req.body.packagesList,
    awb: awbGeneratedNumber
  });
  newOrder.save().then(createdOrder => {
    notification = {
      message: `Order ${createdOrder.awb} was created`,
      type: 'succeed'
    };

    Notifications.findOneAndUpdate({ _id: req.body.sender.email }, {
      $push: {
        notificationsList: [notification]
      }
    }, { upsert: false, setDefaultsOnInsert: true, new: true })

    res.status(201).json({
      message: "Order created"
    });
  }).catch(err => {
    console.log(err);
    return res.status(500).json({
      message: "Error creating order"
    });
  });
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
