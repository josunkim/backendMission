import mongoose from "mongoose";
import Blog from "./models/blog.js";
import Comment from "./models/Comment.js";
import ReComment from "./models/ReCommnet.js";
import { DATABASE_URL } from "./env.js";

const blogData = [
  { title: "react 개론", content: "react는 좋다", author: "강ㅇㅇ" },
  {
    title: "typescripts 개론",
    content: "typescripts는 좋다",
    author: "김ㅇㅇ",
  },
  { title: "python 개론", content: "python 좋다", author: "이ㅇㅇ" },
  {
    title: "잠 잘자는 법",
    content: "졸릴때 까지 깨어 있으셈",
    author: "김ㅇㅇ",
  },
  { title: "요리 잘하는 법", content: "재능", author: "박ㅇㅇ" },
  { title: "코딩 잘하는 법", content: "미쳐라", author: "총ㅇㅇ" },
];
const commentData = [
  { blogId: 1, content: "python이 더 좋음", author: "이ㅇㅇ" },
  { blogId: 2, content: "그거 안좋음", author: "총ㅇㅇ" },
  { blogId: 3, content: "으.. 별로임", author: "강ㅇㅇ" },
  { blogId: 4, content: "good", author: "박ㅇㅇ" },
  { blogId: 5, content: "난 안되겠군", author: "김ㅇㅇ" },
  { blogId: 6, content: "진짜 미치겠군", author: "김ㅇㅇ" },
];
const reCommentData = [
  { commentIdx: 1, content: "ㄴㄴ 그거 별로임", author: "김ㅇㅇ" },
  { commentIdx: 2, content: "아님 좋음", author: "박ㅇㅇ" },
  { commentIdx: 3, content: "그 정 돈 가", author: "강ㅇㅇ" },
  { commentIdx: 4, content: "good~~", author: "이ㅇㅇ" },
  { commentIdx: 5, content: "ㅇㅇ 넌 안됨", author: "총ㅇㅇ" },
  { commentIdx: 6, content: "원래 항상 미쳐야됨", author: "김ㅇㅇ" },
];

mongoose.connect(DATABASE_URL);

await Blog.deleteMany({});
await Comment.deleteMany({});
await ReComment.deleteMany({});
await Blog.insertMany(blogData);
await Comment.insertMany(commentData);
await ReComment.insertMany(reCommentData);

mongoose.connection.close();
