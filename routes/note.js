const { Router } = require("express");
const router = Router();
const authFunc = require("./authFunc");
const noteDAO = require("../daos/note");

router.post("/", authFunc, async (req, res, next) => {
  if (!req.body.text || !req.userId) {
    res.status(400).send("note and id are required");
  } else {
    res.json(await noteDAO.createNote(req.userId, req.body.text));
  }
});

router.get("/", authFunc, async (req, res, next) => {
  if (!req.userId) {
    res.status(400).send("User Id is required");
  } else {
    res.json(await noteDAO.getAllNote(req.userId));
  }
});

router.get("/:id", authFunc, async (req, res, next) => {
  try {
    const temp = await noteDAO.getNote(req.params.id);
    if (temp.userId !== req.userId)
      return res.status(404).send("Not authorized");
    res.json(temp);
  } catch (e) {
    if (e.message.includes("invalid Id")) {
      res.status(400).send(e.message);
    }
  }
});

module.exports = router;
