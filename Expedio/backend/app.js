const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Models
const Ex = require("./models/ex");

const app = express();
app.use(bodyParser.json());

// Databse Connection (MongoDB)
mongoose
  .connect(
    "mongodb+srv://expedioRW:" +
      process.env.MONGO_ATLAS_PW +
      "@expedio-ge1m7.mongodb.net/expedio?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );

  next();
});

// Static Sources
app.use("/", express.static(path.join(__dirname, "ExpedioUI")));


// Api URLs
app.use("/api/test", (req, res, next) => {
  Ex.find().then(documents => {
    res.status(201).json({
      message: "Test works and added!",
      ex: documents
    });
  });
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "ExpedioUI", "index.html"))
});

module.exports = app;
