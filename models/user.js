const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  auth: { type: Boolean, required: true },
});

module.exports = mongoose.model("users", userSchema);
