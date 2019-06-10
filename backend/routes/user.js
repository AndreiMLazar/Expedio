const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const url = req.protocol + "://" + req.get("host");
    console.log(req.body);
    const newUser = new User({
      email: req.body.email,
      password: hash,
      fullName: req.body.fullName,
      userType: req.body.userType,
      telephone: req.body.telephone,
      company: req.body.company,
      cui: req.body.cui,
      country: req.body.country,
      postalCode: req.body.postalCode,
      address: req.body.address,
      avatarPath: url + "/images/avatars/" + req.file.filename,
    });
    newUser.save().then(createdUser => {
      res.status(201).json({
        message: "User created",
        result: createdUser
      },
        console.log(createdUser));
    }).catch(err => {
      console.log(err);
      return res.status(500).json({
        message: "User created"
      });
    });
  }).catch(err => {
    console.log(err);
    return res.status(500).json({
      message: "Signup failed"
    });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "User does not exist"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Passwords do not match"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        'rtK1e`/r2X@@7g#~<]]<;^:9<_7Hp5',
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        email: fetchedUser.email,
        fullName: fetchedUser.fullName,
        userType: fetchedUser.userType,
        telephone: fetchedUser.telephone,
        company: fetchedUser.company,
        cui: fetchedUser.cui,
        country: fetchedUser.country,
        postalCode: fetchedUser.postalCode,
        address: fetchedUser.address,
        avatarPath: fetchedUser.avatarPath
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

router.post("/update", multer({ storage: storage }).single("avatar"), (req, res, next) => {
  User.findOne({ _id: req.body.userId })
    .then(user => {
      bcrypt.compare(req.body.password, user.password).then(result => {
        if (result) {
          User.findOneAndUpdate({ _id: req.body.userId }, {
            $set: {
              fullName: req.body.fullName,
              telephone: req.body.telephone,
              company: req.body.company,
              cui: req.body.cui,
              country: req.body.country,
              address: req.body.address,
              postalCode: req.body.postalCode,
              userType: req.body.userType
            }
          }, {
              "new": true
            }).then(doc => {
              res.status(200).json({
                message: "User updated",
                result: doc
              })
            }).catch(err => {
              console.log(err);
              res.status(500).json({
                message: "Error Occured"
              })
            })
        }
        else {
          return res.status(401).json({
            message: "Password is not correct"
          });
        }
      })
    })
});

module.exports = router;
