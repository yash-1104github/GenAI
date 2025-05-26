
import express from "express";
const router = express.Router();

import { generateImage, validateRequest } from "../controllers/GenerateImage.js";

  
router.post("/generate-image", validateRequest ,  generateImage);

export default router;
