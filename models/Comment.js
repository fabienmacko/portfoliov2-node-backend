const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comments", CommentSchema);