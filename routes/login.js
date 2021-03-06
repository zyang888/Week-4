const { Router } = require("express");
const router = Router();

const userDAO = require("../daos/user");
const authFunc = require("./authFunc");

// login
router.post("/", async (req, res, next) => {
  if (!req.body.password) return res.status(400).send("Missing Password");
  const token = await userDAO.login(req.body.email, req.body.password);
  if (!token) return res.status(401).send("Login failed");
  res.json({ token: token.token });
});

// set password
router.post("/password", authFunc, async (req, res, next) => {
  if (!req.body.password) return res.status(400).send("Missing Password");
  const success = await userDAO.password(req.userId, req.body.password);
  res.sendStatus(success ? 200 : 401);
});

// logout
router.post("/logout", authFunc, async (req, res, next) => {
  let idToken = req.header("Authorization").split("Bearer ")[1];
  await userDAO.logout(idToken);
  res.sendStatus(200);
});

// signup
router.post("/signup", async (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    return res.status(400).send("Missing Password or Email for signup");
  }
  const newUser = await userDAO.signup(req.body.email, req.body.password);
  if (newUser) return res.send(newUser);
  res.status(409).send("signup failed");
});

module.exports = router;
