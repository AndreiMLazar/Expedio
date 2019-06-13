const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const CORS = require("cors")

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Mongoose Options
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Routes
const userRoute = require("./routes/user.route");
const orderRoute = require('./routes/order.route');

// Environment Variables
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();

// CORS
app.use(CORS());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database Connection (MongoDB)
mongoose
  .connect(
    "mongodb+srv://expedioRW:" +
    process.env.MONGO_ATLAS_PW +
    "@expedio-ge1m7.mongodb.net/expedio",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Api URLs
app.use("/api/auth", userRoute);
app.use("/api/order", orderRoute)

// Static Sources
app.get("/ngsw-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "expedioUI", "ngsw-worker.js"));
});

app.get("/safety-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "expedioUI", "safety-worker.js"));
});

app.get("/worker-basic.min.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "expedioUI", "worker-basic.min.js"));
});

app.use("/images/avatars", express.static(path.join(__dirname, "images/avatars")));

app.use("/", express.static(path.join(__dirname, "expedioUI")));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "expedioUI", "index.html"));
});

module.exports = app;
