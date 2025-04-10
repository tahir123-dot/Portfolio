const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: false },
});

module.exports = mongoose.model("user", User, "user");
