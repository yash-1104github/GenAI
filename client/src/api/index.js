//http req send to server

import axios from "axios"; 
const apiKey = import.meta.VITE_HUGGING_FACE_API_KEY;

const API = axios.create({
    //development
    //  baseURL: "http://localhost:8080/api",
    //production
<<<<<<< HEAD
    baseURL:"https://ai-image-generation-quna.onrender.com/api",  
=======
     baseURL: "https://ai-image-generation-quna.onrender.com/api",  
>>>>>>> 0a2232526dbc6e3ae3ed546a522d1843bf544600
});



export const GetPosts = async () => await API.get("/post/");

export const CreatePost = async (data) => await API.post("/post/", data);

<<<<<<< HEAD

=======
>>>>>>> 0a2232526dbc6e3ae3ed546a522d1843bf544600
// export const GenerateImageFromPrompt = async (data) => await API.post("/generateImage/", data); 

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

<<<<<<< HEAD

=======
>>>>>>> 0a2232526dbc6e3ae3ed546a522d1843bf544600

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
<<<<<<< HEAD

=======
>>>>>>> 0a2232526dbc6e3ae3ed546a522d1843bf544600



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
