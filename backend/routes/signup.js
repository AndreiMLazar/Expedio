const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// User Model
const User = require("../models/user");

// Router
const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    callback(error, "backend/images/avatars");
  },

  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];

    // cb(null, name + "-" + Date.now() + "." + ext);
    cb(null, name);
  }
});

router.post("/signup", multer({ storage: storage }).single("avatar"), (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const url = req.protocol + "://" + req.hostname;
    const url2 = url + "/images/avatars/" + req.file.filename;
    const newUser = new User({
      email: req.body.email,
      password: hash,
      fullName: req.body.fullName,
      userType: req.body.userType,
      telephone: req.body.telephone,
      company: req.body.company,
      address: req.body.address,
      avatarPath: url + "/images/avatars/" + req.file.filename
    });
    newUser.save().then(createdUser => {
      res.status(201).json({
        message: "User created",
        result: createdUser
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      })
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    })
  });
});

module.exports = router;
