//http req send to server

import axios from "axios";
const apiKey = import.meta.env.VITE_REPLICATE_API_KEY;

const API = axios.create({
    //development
    //  baseURL: "http://localhost:3000/api/",
    //production
     baseURL: "https://ai-image-generation-44ys.onrender.com/api",  
});



export const GetPosts = async () => await API.get("/post/");

export const CreatePost = async (data) => await API.post("/post/", data);

// export const GenerateImageFromPrompt = async (data) => await API.post("/generateImage/", data); 

export const GenerateImageFromPrompt = async (data) => {
    try {
        const response = await axios.post("https://ai-image-generation-44ys.onrender.com/api/generateImage/", data,{
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


// export const GenerateImageFromPrompt = async (data) => {
//     try {
//         const response = await axios.post("https://ai-image-generation-44ys.onrender.com/api/generateImage/", data,{
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`,
//             }

//         }); 
//         console.log(data);
//         return response;
//     } catch (error) {
//         console.error("Error generating image:", error?.response?.data || error.message);
//         throw error;
//     }
// };



// export const GenerateImageFromPrompt = fetch('http://localhost:8080/api/post', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({data}),
// })
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => console.error(err));
