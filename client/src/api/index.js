//http req send to server

import axios from "axios"; 
const apiKey = import.meta.VITE_HUGGING_FACE_API_KEY;

const API = axios.create({
    //development
    // baseURL: "http://localhost:8080/api",
    //production
     baseURL: "https://ai-image-generation-quna.onrender.com/api",  
});



export const GetPosts = async () => await API.get("/post/");

export const CreatePost = async (data) => await API.post("/post/", data);

export const GenerateImageFromPrompt = async (data) => {
    try {
        const response = await axios.post("https://ai-image-generation-quna.onrender.com/api/generateImage/", data,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            }
 
        }); 
        console.log(data);
        return response;
    } catch (error) {
        console.error("Error generating image:", error?.response?.data || error.message);
        throw error;
    }
};


