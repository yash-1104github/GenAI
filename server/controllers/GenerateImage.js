import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { HfInference } from "@huggingface/inference";

dotenv.config();


const client = new HfInference('GsdlMlQNLfFZRsncMiHgNbVgMtKahtVRuo');


export const validateRequest = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        const input = {
            prompt,
            go_fast: true,
            megapixels: "1",
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "webp",
            output_quality: 80,
        };
       
       // console.log(input); 

        const response = await client.textToImage({
            model: "stabilityai/stable-diffusion-3.5-large",
            inputs: {input},
            provider: "hf-inference",
        });
        //console.log(response);

        const generatedImageURL = response[0];
       // console.log(generatedImageURL);

        const imageResponse = await fetch(generatedImageURL);
      //  console.log(imageResponse);
        
        if (!imageResponse.ok) {
            return res.status(500).json({ error: "Failed to fetch the image" });
        }

        const imageBuffer = await imageResponse.arrayBuffer();
       // console.log(imageBuffer);

        const generatedImage = Buffer.from(imageBuffer).toString("base64");
       // console.log(generateImage);

        return res.status(200).json({ photo: generatedImage });

    } catch (error) {
        next(createError(error.status, error?.response?.data?.error.message || error.message));
    }
};











        //console.log(generateImage);
        // if (!response || response.length === 0) {
        //     return res.status(400).json({ error: "No image generated" });
        // }
        // if (!generatedImageURL) {
        //     return res.status(400).json({ error: "No image generated" });  
        // }
