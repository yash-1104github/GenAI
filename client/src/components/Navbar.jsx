import React from "react";
import styled from "styled-components";
import Button from "./button";
import { AddRounded, ExploreRounded } from "@mui/icons-material"
import { useNavigate, useLocation, Link } from "react-router-dom";
import { IconButton } from '@mui/material';
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';
import { dark } from '../utils/Theme';


const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.menu_primary_text};
  font-weight: bold;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 50px;
  position: sticky;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
  }
  
`;


const Navbar = ({ toggleTheme,theme }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split("/");

    //console.log("Current theme:", theme);


    return (
        <>
            <Container>
              <Link to="/">
                 <span className="text-4xl tracking-wider">GenAI</span>
              </Link>    
                <div className="flex  gap-4">
                {
                    path[1] === "post" ? (
                        <Button onClick={() => navigate("/")} text="Explore Posts" type="secondary"
                            leftIcon={
                                <ExploreRounded
                                    style={{
                                        fontSize: "18px",
                                    }}
                                />
                            }
                        />
                    ) : (
                        <Button onClick={() => navigate('/post')} text="Create new Post"
                            leftIcon={
                                <AddRounded
                                    style={{
                                        fontSize: "18px",
                                    }
                                    }
                                />
                            }
                        />
                    )
                }

                    <IconButton onClick={toggleTheme} className="transition-all cursor-pointer">
                        {theme === dark  ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                </div>
                   
            </Container>
        </>
    );
};

export default Navbar;
