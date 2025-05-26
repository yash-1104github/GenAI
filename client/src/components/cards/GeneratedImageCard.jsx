import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";



const Container = styled.div`
  flex: 1;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.yellow + 90};
  color: ${({ theme }) => theme.arrow + 100};
  border-radius: 20px;
  height: 80vh;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;


const Image = styled.img`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.black + 50};
  border-radius: 18px;
  object-fit: cover;
`;


const GeneratedImageCard = ({ src, loading }) => {
    return (
        <>
            <Container>
                {loading ? (
                    <>
                        <CircularProgress
                            sx={{ color: "inherit", width: "24px", height: "24px" }} />
                        Generating Your Image . . .
                    </>
                ) : src ? (
                    <Image src={src} />
                ) : (
                    <>Write a prompt to generate image</>
                )}
            </Container>
        </>
    );

};

export default GeneratedImageCard;
