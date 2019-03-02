var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteModel = new Schema({
  articleID: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  noteBody: String,
  date: {
    type: Date,
    default: Date.now
  }
});

var Note = mongoose.model("Note", noteModel);

module.exports = Note;
