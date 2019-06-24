const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  fullName: { type: String, required: true },
  telephone: { type: String, required: true },
  company: { type: String, required: false },
  cui: { type: String, required: false },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  address: { type: String, required: false },
  avatarPath: { type: String, required: false }
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("User", userSchema);
