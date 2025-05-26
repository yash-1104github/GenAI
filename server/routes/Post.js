
import express from "express";
import { createPost, getAllPosts , getPostDetail} from "../controllers/Posts.js";

const router = express.Router();

router.get("/getPost", getAllPosts);
router.post("/createPost", createPost);
router.get("/:id", getPostDetail); 

export default router;