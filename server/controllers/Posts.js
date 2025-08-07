import Post from "../models/Post.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    signature_algorithm: 'sha256'
});

// Get all posts
export const getAllPosts = async (req, res, next) => {
    try {
        // Server receives and processes the GET request
        const posts = await Post.find({});// MongoDB query
        return res.status(200).json({ success: true, data: posts, message: "Posts fetched successfully" });
        
    } catch (error) {
        return next(
            createError(
                error.status,
                error?.response?.data?.error.message || error.message
            )
        )
    }
};

// Create new post
export const createPost = async (req, res, next) => {
    try {
        const { name, prompt, photo } = req.body;
        //console.log("Received data:", { name, prompt, photo });
        const photoUrl = await cloudinary.uploader.upload(photo);
         //data saves on mongodb
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.secure_url,
        });

        return res.status(200).json({ success: true, data: newPost , message: "Post created successfully" });

    } catch (error) {
        console.log(error);
        return next(
            createError(error.status, error?.response?.data?.error.message)
        );
    }
};

// Get post detail by ID
export const getPostDetail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        
        if (!post) {
            return next(createError(404, "Post not found"));
        }

        return res.status(200).json({ success: true, data: post, message: "Post fetched successfully" });

    } catch (error) {
        return next(
            createError(
                error.status,
                error?.response?.data?.error.message || error.message
            )
        );
    }
}