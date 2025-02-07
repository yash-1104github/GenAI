
import express from "express";
import { createPost, getAllPosts } from "../controllers/Posts.js";

const router = express.Router();

//chect http mthd
router.get("/", getAllPosts);
router.post("/", createPost);

export default router;