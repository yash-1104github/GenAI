import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";
import FileSaver from "file-saver";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 80};
    scale: 1.05;
  }
  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: start;
  gap: 2px;
  justify-content: end;
  flex-direction: column;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  opacity: 0;
  padding: 16px;
  transition: opacity 0.3s ease;
  color: ${({ theme }) => theme.white};

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-weight: 400;
  font-size: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 1.4;
  max-height: 50px;
  margin-bottom: 10px;
  overflow: hidden;
  letter-spacing: 0.4px;
  align-items: center;
  gap: 8px;
  padding: 10px;
  text-align: center;
  width: 100%;
  justify-content: center;
  text-transform: capitalize;
  color: ${({ theme }) => theme.white};

  @media (max-width: 768px) {
    font-size: 12px;
    font-weight: 300;
  }
`;

const Author = styled.div`
  font-weight: 600;
  font-size: 14px;
  display: flex;
  gap: 16px;
  align-items: center;
  color: ${({ theme }) => theme.white};

  @media (max-width: 768px) {
    font-size: 10px;
    font-weight: 200;
  }
`;

const ImageCard = ({ item }) => {
   const navigate = useNavigate();

   const handleCardClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <Card key={item._id} onClick={() => handleCardClick(item._id)}>
      <LazyLoadImage
        alt={item?.prompt}
        width="100%"
        src={item?.photo}
        style={{ borderRadius: "12px" }}
      />
      <HoverOverlay>
        <Prompt>{item?.prompt}</Prompt>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Author>
            <Avatar
              sx={{
                background: "green",
                width: { xs: "16px", sm: "32px" },
                height: { xs: "16px", sm: "32px" },
                letterSpacing: "1px",
                fontSize: { xs: "10px", sm: "14px" },
              }}
            >
              {item?.name[0]}
            </Avatar>{" "}
            {item?.name}
          </Author>
          <DownloadRounded
            onClick={() => FileSaver.saveAs(item?.photo, `download.jpg`)}
          />
        </div>
      </HoverOverlay>
    </Card>
  );
};

export default ImageCard;
