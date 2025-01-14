import mongoose from "mongoose";
import SequenceFactory from "mongoose-sequence";

const AutoIncrement = SequenceFactory(mongoose);

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
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
BlogSchema.plugin(AutoIncrement, { inc_field: "idx" });
const Blog = mongoose.model("blog", BlogSchema);

export default Blog;
