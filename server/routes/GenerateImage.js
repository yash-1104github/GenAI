
import express from "express";
const router = express.Router();

import { generateImage, validateRequest } from "../controllers/GenerateImage.js";

  
router.post("/", validateRequest ,  generateImage);

export default router;