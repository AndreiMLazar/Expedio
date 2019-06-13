// Command Model
const Command = require("../models/command.model");
const randomstring = require("randomstring");

exports.createClientCommand = (req, res, next) => {
  let awbGeneratedNumber = randomstring.generate({
    capitalization: 'uppercase',
    charset: 'alphanumeric',
    length: 16
  })
  console.log(awbGeneratedNumber);
  const newCommand = new Command({
    sender: req.body.sender,
    recipient: req.body.recipient,
    loadingPlace: req.body.loadingPlace,
    deposit: req.body.deposit,
    packagesList: req.body.packagesList,
    awb: awbGeneratedNumber
  });
  newCommand.save().then(createdCommand => {
    res.status(201).json({
      message: "Command created"
    });
  }).catch(err => {
    console.log(err);
    return res.status(500).json({
      message: "Error creating command"
    });
  });
}

exports.showClientCommands = (req, res, next) => {
  Command.find({ "sender.email": req.params.id })
    .then(command => {
      if (command) {
        res.status(200).json(command);
      } else {
        res.status(404).json({ message: "You have no commands yet" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching command failed"
      });
    });
}
