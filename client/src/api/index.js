
import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
const baseURL = import.meta.env.VITE_BACKEND_URL;


export const GetPosts = async () => {
  try {
    const response = await axios.get(baseURL + '/post/getPost');
    // console.log("Response from GetPosts:", response.data);
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response format");
    }
    return response.data.data ; // Ensure we return an array
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const CreatePost = async (post) => {
  try {
    const response = await axios.post(baseURL + '/post/createPost',post);
   // console.log("Response from CreatePost:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};


export const GenerateImageFromPrompt = async (data) => {
  try {
   //  console.log("Sending Authorization header:", apiKey);
    const response = await axios.post(
        baseURL + '/generateImage/generate-image',
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": apiKey,
        },
      }
    );
    //console.log(data);
    console.log("Response from GenerateImageFromPrompt:", response.data.photo);

    return response.data.photo; // Ensure we return the image URL or data
  } catch (error) {
    console.error(
      "Error generating image:",
      error?.response?.data || error.message
    );
    throw error;
  }
};
