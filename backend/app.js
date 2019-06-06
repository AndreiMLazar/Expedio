const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// Models
const Ex = require("./models/ex");

const app = express();
app.use(bodyParser.json());

// Database Connection (MongoDB)
mongoose
  .connect(
    "mongodb+srv://expedioRW:" +
    process.env.MONGO_ATLAS_PW +
    "@expedio-ge1m7.mongodb.net/expedio?retryWrites=true&w=majority",
    { useNewUrlParser: true }
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

// Api URLs
app.use("/api/test", (req, res, next) => {
  Ex.find().then(documents => {
    res.status(201).json({
      message: "Test works and added!",
      ex: documents
    });
  });
});

app.get("/ngsw-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "expedioUI", "ngsw-worker.js"));
});

app.get("/safety-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "expedioUI", "safety-worker.js"));
});

app.get("/worker-basic.min.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "expedioUI", "worker-basic.min.js"));
});

// Static Sources
app.use("/", express.static(path.join(__dirname, "expedioUI")));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "expedioUI", "index.html"));
});

module.exports = app;
