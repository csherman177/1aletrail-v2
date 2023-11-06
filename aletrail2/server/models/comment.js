const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
    max: 280,
    min: 3,
  },
  breweryId: {
    type: String,
    required: true,
  },
  breweryName: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
