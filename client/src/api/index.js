//htttp req send to server


import axios from "axios";

const headers = {
    "Authorization": `Token ${import.meta.env.VITE_REPLICATE_API_KEY}`,
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

const API = axios.create({
    //development
     baseURL: "http://localhost:8080/api/",
    //production
    // baseURL:"https://ai-image-generation-44ys.onrender.com/api",  
    //  proxy: false,
    // headers: { ...headers },
});



export const GetPosts = async () => await API.get("/post/");

export const CreatePost = async (data) => await API.post("/post/", data);

//export const GenerateImageFromPrompt = async (data) => await API.post("/generateImage/", data); 

export const GenerateImageFromPrompt = async (data) => {
    try {
        const response = await axios.post("http://localhost:8080/api/generateImage/", data,{
            headers: {
                'Content-Type': 'application/json',
            }
        }); 
        console.log(data);
        return response;
    } catch (error) {
        console.error("Error generating image:", error?.response?.data || error.message);
        throw error;
    }
};




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
