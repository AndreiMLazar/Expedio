// Order Model
const ClientOrder = require("../models/client-order/client-order.model");
const CompanyOrder = require("../models/company-order/company-order.model");
const AgentOrder = require("../models/agent-order/agent-order.model");
const Notifications = require("../models/user-notifications.model");
const Notification = require("../models/notification/notification.model");
const randomstring = require("randomstring");

exports.createClientOrder = (req, res, next) => {
  let awbGeneratedNumber = randomstring.generate({
    capitalization: 'uppercase',
    charset: 'alphanumeric',
    length: 16
  });
  const newOrder = new ClientOrder({
    createdDate: req.body.createdDate,
    sender: req.body.sender,
    recipient: req.body.recipient,
    loadingPlace: req.body.loadingPlace,
    deposit: req.body.deposit,
    packagesList: req.body.packagesList,
    awb: awbGeneratedNumber
  });
  newOrder.save().then(createdOrder => {
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
    res.status(201).json({
      message: "Client order created"
    });
  }).catch(err => {
    console.log(err);
    return res.status(500).json({
      message: "Error creating client order"
    });
  });
}

exports.createCompanyOrder = (req, res, next) => {
  const newOrder = new CompanyOrder({
    createdDate: req.body.createdDate,
    instructions: req.body.instructions,
    sender: req.body.sender,
    transportDetails: req.body.transportDetails,
    trucks: req.body.trucks
  });
  newOrder.save().then(createdOrder => {
    res.status(201).json({
      message: "Company order created"
    });
  }).catch(err => {
    console.log(err);
    return res.status(500).json({
      message: "Error creating company order"
    });
  });
}

exports.createAgentOrder = (req, res, next) => {
  let awbGeneratedNumber = randomstring.generate({
    capitalization: 'uppercase',
    charset: 'alphanumeric',
    length: 16
  });
  const newOrder = new AgentOrder({
    awb: awbGeneratedNumber,
    createdDate: req.body.createdDate,
    instructions: req.body.instructions,
    sender: req.body.sender,
    recipient: req.body.recipient,
    transport: req.body.transport,
    packagesList: req.body.packagesList
  });
  newOrder.save().then(createdOrder => {
    res.status(201).json({
      message: "Agent order created"
    });
  }).catch(err => {
    console.log(err);
    return res.status(500).json({
      message: "Error creating agent order"
    });
  });
}

exports.showCompanyOrders = (req, res, next) => {
  CompanyOrder.find({ "sender.email": req.params.id })
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

exports.showClientOrders = (req, res, next) => {
  ClientOrder.find({ "sender.email": req.params.id })
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

exports.getClientOrder = (req, res, next) => {
  ClientOrder.find({ "awb": req.params.awb })
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
