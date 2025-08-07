import React, { useState } from "react";
import styled from "styled-components";
import GenerateImageForm from "../components/form/GenerateImageForm";
import GeneratedImageCard from "../components/cards/GeneratedImageCard";


const Container = styled.div`
  padding: 20px 30px;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
   background: ${({ theme }) => theme.background}; 
  
`;

const Wrapper = styled.div`
  display: flex;
  gap: 8%;
  flex: 1;
  max-width: 1200px;
  height: fit-content;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 40px;
  }
`;


const CreatePost = () => {

  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setcreatePostLoading] = useState(false);

  const [post, setPost] = useState({
    author: "",
    prompt: "",
    photo: "",
  });

  return (
    <Container>
      <Wrapper>
        <GenerateImageForm 
          createPostLoading={createPostLoading}
          setcreatePostLoading={setcreatePostLoading}
          generateImageLoading={generateImageLoading}
          setGenerateImageLoading={setGenerateImageLoading}
          post={post}
          setPost={setPost} />
        <GeneratedImageCard loading={generateImageLoading} src={post.photo} />
      </Wrapper>
    </Container>
  );
};

export default CreatePost;
