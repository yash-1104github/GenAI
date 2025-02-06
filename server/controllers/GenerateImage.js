import * as dotenv from "dotenv";
import { createError } from "../error.js";
import Replicate from "replicate";

dotenv.config();


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});


export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        const replicateHeaders = {
            'Content-Type': 'application/json',
            'User-Agent': 'YourApplication/1.0'
        };

        const input = {
            prompt,
            go_fast: true,
            megapixels: "1",
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "webp",
            output_quality: 80,
        };

        const response = await replicate.run("black-forest-labs/flux-schnell", { input, headers: replicateHeaders });

        const generatedImageURL = response[0];

        //console.log(generateImage);

        if (!generatedImageURL) {
            return res.status(400).json({ error: "No image generated" });  
        }

        const fetchHeaders = {
            'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
            'Accept': 'image/webp',
            'User-Agent': 'ai-image-generation/0.0.0'
        };

        const imageResponse = await fetch(generatedImageURL,{
            headers: fetchHeaders
        });

        if (!imageResponse.ok) {
            return res.status(500).json({ error: "Failed to fetch the image" });
        }

        const imageBuffer = await imageResponse.arrayBuffer();
        const generatedImage = Buffer.from(imageBuffer).toString("base64");


        res.status(200).json({ photo: generatedImage });

    } catch (error) {
        next(
            createError(
                error.status,
                error?.response?.data?.error.message || error.message
            )
        );
    }
};
