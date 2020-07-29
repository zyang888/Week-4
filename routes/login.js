const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authFunc = require("./authFunc");
// set password
router.post("/password", authFunc, async (req, res, next) => {
  if (!req.body.password)
    return res.status(400).send("New password cannot be null");
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await User.updateOne(
      { _id: req.userId },
      {
        $set: { password: hashPassword },
      }
    );
  } catch (e) {
    return res.status(401).send("Cannot change password");
  }
  res.status(200).send();
});

// logout
router.post("/logout", authFunc, async (req, res, next) => {
  await User.updateOne({ _id: req.userId }, { $set: { auth: false } });
  res.sendStatus(200);
});

// signup
router.post("/signup", async (req, res, next) => {
  if (!req.body.password || !req.body.email)
    return res.status(400).send("Missing Password or Email for signup");
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  if (await User.countDocuments({ email: req.body.email }))
    return res.status(409).send("Email already registered");
  const user = new User({
    email: req.body.email,
    password: hashPassword,
    auth: false,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// login
router.post("/", async (req, res, next) => {
  if (!req.body.password)
    return res.status(400).send("Missing Password for login");
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("User not found");
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(401).send("Invalid password");
  await User.updateOne({ _id: user._id }, { $set: { auth: true } });
  const token = jwt.sign({ _id: user._id }, "secret_key");
  res.json({ token: token });
});

module.exports = router;
