import * as dotenv from "dotenv";
import { createError } from "../error.js";
import FormData from "form-data";
import axios from "axios";

dotenv.config();


export const validateRequest = (req, res, next) => {
    
    const token = req.headers['Authorization'] || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' , message: "Authorization header is missing", success: false });
    }
    next();
};

export const generateImage = async(req, res, next) => {
    try {
        const { prompt } = req.body;
        // console.log(prompt);
        
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required", success: false });
        }

        const formData = new FormData()
        formData.append('prompt', prompt)

       const {data} =  await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
               
            },
            responseType: 'arraybuffer',
        });

        // console.log(data); 

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        // console.log(base64Image);
        const resultImage = `data:Image/png;base64,${base64Image}`
        // console.log(resultImage);

        res.json({ success: true, message: "Image generated successfully", photo: resultImage });

    } catch (error) {
        // console.error("Error generating image:", error);
        res.json({ error: "Failed to generate image" , success: false, prompt: req.body.prompt
        });
        next(createError(error.status, error?.response?.data?.error.message || error.message));
    }
};

