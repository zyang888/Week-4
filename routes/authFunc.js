const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  if (!req.header("Authorization")) return res.status(401).send("Access Denied");
  let idToken = req.header("Authorization").split("Bearer ")[1];
  try {
    const userId = jwt.verify(idToken, "secret_key");
    const user = await User.findOne({ _id: userId });
    if (!user.auth) throw new Error("Invalid Token");
    req.userId = userId;
    next();
  } catch (e) {
    res.status(401).send(e);
  }
};
