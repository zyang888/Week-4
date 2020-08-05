const Token = require("../models/token");

module.exports = async (req, res, next) => {
  if (!req.header("Authorization"))
    return res.status(401).send("Not authorized");
  let idToken = req.header("Authorization").split("Bearer ")[1];
  const token = await Token.findOne({ token: idToken });
  if (token) {
    req.userId = token.userId;
    next();
  } else res.status(401).send("Not authorized");
};
