import Button from "../button";
import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../Input/TextInput";
import { AutoAwesome, CreateRounded , Warning} from "@mui/icons-material";
import { CreatePost, GenerateImageFromPrompt } from "../../api";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../../utils";

const Form = styled.div`
  flex: 1;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 8%;
  justify-content: center;
  height: fit-content;
`;

const Top = styled.div`
  display: flex;
  padding-bottom: 5px;
  margin-bottom: 15px;
  margin-top: 5px;
`;


const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme + 100};
  margin-bottom: 5px;
`;

const Actions = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;

  /* button {
      flex: 1;
      min-width: 120px;
      height: 40px;
      white-space: nowrap;
       overflow: hidden;
       
  }

  @media (max-width: 768px) {
    gap: 6px;
    button {
      min-width: 100px;
    }
  }

   @media (max-width: 420px) {
    gap: 4px;
    button {
      min-width: 80px;
      height: 26px; 
      font-size: 8px; 
    } */
`;

const GenerateImageForm = ({
  createPostLoading,
  setcreatePostLoading,
  generateImageLoading,
  setGenerateImageLoading,
  post,
  setPost,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const generateImage = async () => {
    setGenerateImageLoading(true);
    setError("");
    await GenerateImageFromPrompt({ prompt: post.prompt })
      .then((photoData) => {
        //console.log("Generated Image Data:", photoData);
        setPost({
          ...post,
          photo: photoData, // Assuming photoData is the URL or base64 string of the image
        });
        setGenerateImageLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setGenerateImageLoading(false);
      });
  };

  const createPost = async () => {
    setcreatePostLoading(true);
    setError("");
    await CreatePost(post)
      .then((res) => {
        navigate("/");
        setcreatePostLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setcreatePostLoading(false);
      });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(post.prompt);
    setPost({ ...post, prompt: randomPrompt });
  };

  {
    <Button
      text="Surpre Me"
      className="text-xl"
      leftIcon={<AutoAwesome />}
      onClick={handleSurpriseMe}
    />;
  }

  return (
    <>
    <div className="py-1">
      <Form>
        <Top>
          <div className="text-2xl md:text-3xl font-medium tracking-[0.5px] pl-2 md:pl-0 capitalize mb-2 mt-20 md:mt-0 text-center font-[Poppins] text-[var(--tw-text-primary)]"> Generate Image with prompt</div>
        </Top>

        <Body>
          <TextInput
            label="Author"
            placeholder="Enter Full Name"
            name="name"
            value={post.name}
            handelChange={(e) => setPost({ ...post, name: e.target.value })}
          />
          <TextInput
            label="Image Prompt"
            placeholder="Write a detailed prompt about the image"
            name="prompt"
            textArea
            rows="10"
            value={post.prompt}
            handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
          />
          <div className="flex w-full ml-5 justify-center">
            {
              <Button
                text="Surpre Me"
                leftIcon={<Warning />}
                onClick={handleSurpriseMe}
              />
            }
          </div>
          {error && <div style={{ color: "red", padding: "5px" }}>{error}</div>}
          <div className="flex w-full justify-center my-4 tracking-wide">
             You can post the AI Generated Image to showcase in the community!
          </div>
          
        </Body>

        <Actions>
          <Button
            text="Generate Image"
            leftIcon={<AutoAwesome />}
            flex
            isLoading={generateImageLoading}
            isDisabled={post.prompt === ""}
            onClick={(e) => generateImage()}
          />
          <Button
            text="Post Image"
            leftIcon={<CreateRounded />}
            type="secondary"
            flex
            isDisabled={
              post.name === "" || post.photo === "" || post.prompt === ""
            }
            isLoading={createPostLoading}
            onClick={() => createPost()}
          />
        </Actions>
      </Form>
      </div>
    </>
  );
};

export default GenerateImageForm;
