
import axios from "axios";

const API = axios.create({
    //development
    // baseURL: "http://localhost:8080/api/",
    //production
    baseURL:"https://ai-image-generation-44ys.onrender.com/api"
});

export const GetPosts = async () => await API.get("/post/");
export const CreatePost = async (data) => await API.post("/post/", data);
export const GenerateImageFromPrompt = async (data) => await API.post("/generateImage/", data); 