import mongoose from "mongoose";
import SequenceFactory from "mongoose-sequence";

const AutoIncrement = SequenceFactory(mongoose);

const CommentSchema = new mongoose.Schema(
  {
    blogId: { type: Number, required: true },
    content: { type: String, required: true },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
CommentSchema.plugin(AutoIncrement, { inc_field: "commentIdx" });
const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
