
import express from "express";
import { generateImage } from "../controllers/GenerateImage.js";

const router = express.Router();

const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
};


router.post("/", corsMiddleware, generateImage, );

export default router;