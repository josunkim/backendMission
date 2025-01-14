import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./models/blog.js";
import Comment from "./models/Comment.js";
import ReComment from "./models/ReCommnet.js";
import { DATABASE_URL } from "./env.js";

dotenv.config();
const app = express();
const PORT = 5005;

mongoose
  // .connect(process.env.DATABASE_URL)
  .connect(DATABASE_URL)
  .then(() => console.log("성공"))
  .catch((err) => console.log(err));
app.use(express.json());

app.get("/blog/get", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const data = await Blog.find({}).limit(limit);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/blog/getId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Blog.findOne({ idx: id });
    if (!id) {
      res.status(404).send({ message: "check id" });
    }
    if (!data) {
      res.status(404).send({ message: "not found" });
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/blog/create", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newData = await Blog.create({
      title,
      content,
      author,
    });

    if (!title) {
      return res.status(400).send("title이 없음");
    }
    if (!content) {
      return res.status(400).send("content가 없음");
    }
    if (!author) {
      return res.status(400).send("author가 없음");
    }
    res.status(200).send(newData);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/blog/patch/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;

    const data = await Blog.findOneAndUpdate(
      { idx: id },
      { title: title, content: content },
      { new: true }
    );

    if (!data) {
      return res.status(404).send({ message: "blog not found" });
    }
    console.log(req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/blog/delete/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await Blog.findOneAndDelete({ idx: id });

    if (data === null) {
      res.status(404).send({ message: "No blog found to delete." });
    }
    res.status(200).send({ message: "delete success" });
  } catch (error) {
    res.status(400).send({ message: "delete fail :", error });
  }
});
app.get("/blog/comment/get/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const data = await Comment.find({ blogId });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.post("/blog/comment/post", async (req, res) => {
  try {
    const { blogId, content, author } = req.body;
    const blog = await Blog.findOne({ idx: blogId });

    if (!blog) {
      return res.status(400).send({ message: "blog not found" });
    }
    if (!content) {
      return res.status(400).send({ message: "내용이 없음" });
    }
    if (!author) {
      return res.status(400).send({ message: "작성자가 필요함" });
    }

    const data = await Comment.create({ blogId, content, author });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/blog/comment/patch/:commentId", async (req, res) => {
  const id = req.params.commentId;
  const { content } = req.body;
  const data = await Comment.findOneAndUpdate(
    { commentIdx: id },
    { content: content },
    { new: true }
  );
  if (!data) {
    return res.status(400).send("comment not found");
  }
  res.status(200).send(data);
  try {
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/blog/comment/delete/:commentId", async (req, res) => {
  const id = req.params.commentId;
  const data = await Comment.findOneAndDelete({ commentIdx: id });
  const reComment = await ReComment.findOneAndDelete({ commentIdx: id });
  if (data === null) {
    return res.status(400).send({ message: "comment not found" });
  }
  res.status(200).send(data);
});

app.get("/blog/recomment/get/:id", async (req, res) => {
  try {
    const commentIdx = req.params.id;
    const data = await ReComment.find({ commentIdx });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/blog/recomment/post", async (req, res) => {
  try {
    const { commentIdx, content, author } = req.body;
    const comment = await Comment.findOne({ commentIdx: commentIdx });

    if (!comment) {
      return res.status(400).send({ message: "comment not found" });
    }
    if (!content) {
      return res.status(400).send({ message: "내용이 없음" });
    }
    if (!author) {
      return res.status(400).send({ message: "작성자가 필요함" });
    }

    const data = await ReComment.create({ commentIdx, content, author });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/blog/recomment/patch/:RecommentIdx", async (req, res) => {
  const RecommentIdx = req.params.RecommentIdx;
  const { content } = req.body;
  const data = await ReComment.findOneAndUpdate(
    { RecommentIdx: RecommentIdx },
    { content: content },
    { new: true }
  );
  if (!data) {
    return res.status(400).send("recomment not found");
  }
  res.status(200).send(data);
  try {
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/blog/recomment/delete/:RecommentIdx", async (req, res) => {
  const RecommentIdx = req.params.RecommentIdx;
  const data = await ReComment.findOneAndDelete({ RecommentIdx: RecommentIdx });
  if (data === null) {
    return res.status(400).send({ message: "comment not found" });
  }
  res.status(200).send(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
