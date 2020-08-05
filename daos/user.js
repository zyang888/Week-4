const mongoose = require("mongoose");
const User = require("../models/user");
const Token = require("../models/token");
const bcrypt = require("bcryptjs");
const uuid = require("uuid-random");
const salt = 10;

module.exports = {};

module.exports.signup = async (email, password) => {
  const count = await User.countDocuments({ email: email });
  if (count>0) return;
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    email: email,
    password: hashedPassword,
  });
  return await User.create(newUser);
};

module.exports.login = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) return;
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return;
  return await Token.create({ token: uuid(), userId: user._id });
};

module.exports.logout = async (token) => {
  await Token.deleteOne({ token: token });
  return;
};

module.exports.password = async (userId, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } }
    );
    return true;
  } catch (err) {
    return false;
  }
};
