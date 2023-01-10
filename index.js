import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from 'cors'

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";

import { CommentController, PostController, UserController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:0880567@cluster0.wh3ur5h.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db");
  })
  .catch((err) => console.log('eerrr',err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors())
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/auth/me", checkAuth, UserController.getMe);
app.patch("/auth/me/:id", checkAuth, UserController.update);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.get("/comments", CommentController.getAll);
app.get("/comments/:id", CommentController.getByPostId);
app.post(
  "/comments",
  checkAuth,
  handleValidationErrors,
  CommentController.create
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
