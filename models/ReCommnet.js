import mongoose from "mongoose";
import SequenceFactory from "mongoose-sequence";

const AutoIncrement = SequenceFactory(mongoose);

const ReCommentSchema = new mongoose.Schema(
  {
    commentIdx: { type: Number, required: true },
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
ReCommentSchema.plugin(AutoIncrement, { inc_field: "RecommentIdx" });
const ReComment = mongoose.model("ReComment", ReCommentSchema);

export default ReComment;
