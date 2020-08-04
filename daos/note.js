const mongoose = require("mongoose");

const Note = require("../models/note");

module.exports = {};

module.exports.createNote = async (userId, text) => {
  try {
    return await Note.create({ userId: userId, text: text });
  } catch (e) {
    throw e;
  }
};

module.exports.getAllNote = async (userId) => {
  return await Note.find({ userId: userId });
};

module.exports.getNote = async (noteId) => {
  try {
    return await Note.findOne({ _id: noteId });
  } catch (e) {
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      throw new Error("invalid Id");
    }
  }
};
