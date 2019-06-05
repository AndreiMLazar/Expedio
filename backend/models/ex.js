const mongoose = require("mongoose");

const exSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Ex', exSchema);
