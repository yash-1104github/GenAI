import React from "react";
import styled from "styled-components";
import { SearchOutlined } from "@mui/icons-material";

const SearchBarContainer = styled.div`
  max-width: 550px;
  display: flex;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.text_secondary + 90};
  border-radius: 8px;
  cursor: pointer;
  padding: 12px 16px;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  color: ${({ theme }) => theme.text_primary};
  
`;


const SearchBar = ({ search, handleChange }) => {
    return (
        <SearchBarContainer>
            <SearchOutlined sx={{ color: "inherit" }} />
            <input
                type="text"
                placeholder="Search with prompt or name . . ."
                style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    background: "inherit",
                    color: "inherit",
                    fontSize: "16px",
                }}
                value={search}
                onChange={(e) => handleChange(e)}
            />
        </SearchBarContainer>

    );
};

export default SearchBar;