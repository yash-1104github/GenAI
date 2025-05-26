import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;
import Button from "../components/button";
import FileSaver from "file-saver";
import { Download } from "@mui/icons-material";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      // console.log("Fetching post with ID:", id);
      const res = await axios.get(`${baseURL}/post/${id}`);
      setPost(res.data.data); 
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        Loading post...
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen my-4 px-4">
        <div className="flex flex-col items-center justify-center gap-4 my-8">
          <img
            className="w-full max-w-[600px] h-auto sm:h-[60vh] object-cover border-2 border-gray-300 rounded-lg p-2"
            src={post.photo}
            alt="Post"
          />
          <h2 className="text-lg sm:text-xl font-medium my-2 font-mono text-center justify-center">Prompt: {post.prompt}</h2>
          <p className=" text-lg sm:text-xl font-medium mb-2 font-mono"> Created by: {post.name}</p>
          <Button
            onClick={() => {
              FileSaver.saveAs(post.photo, "downloaded-image.jpg");
            }}
            text="Download"
            type="primary"
            leftIcon={
              <Download
                style={{
                  fontSize: "18px",
                }}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default PostDetail;
