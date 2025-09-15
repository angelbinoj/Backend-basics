import express from'express';
import { getPosts, addPost, deletePost, updatePost } from "../controllers/postController.js";
export const postRouter = express.Router();


//creating routes

postRouter.get("/getPosts", getPosts);
postRouter.post("/addPosts", addPost);
postRouter.delete("/delPosts/:id", deletePost);
postRouter.patch("/post/:id", updatePost);

