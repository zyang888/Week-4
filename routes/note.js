const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();
const Note = require("../models/note");
const authFunc = require("./authFunc");

router.post("/", authFunc, async (req, res, next) => {
  if (!req.body.text) {
    res.status(400).send("note is required");
  } else {
    try {
      const note = { userId: req.userId, text: req.body.text };
      const newNote = await Note.create(note);
      res.json(newNote);
    } catch (e) {
      res.status(400).send("Error occurred @ post note");
    }
  }
});

router.get("/", authFunc, async (req, res, next) => {
  const tempNote = await Note.find({ userId: req.userId });
  res.json(tempNote);
});

router.get("/:id", authFunc, async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("invalid ID");
  }
  const tempNote = await Note.findOne({
    _id: req.params.id,
  });
  if (!tempNote) {
    res.status(400).send("note not found");
  } else if (tempNote.userId !== req.userId._id) {
    res.status(404).send("note not authorized");
  } else {
    res.json(tempNote);
  }
});

module.exports = router;
