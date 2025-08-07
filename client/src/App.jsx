import { lazy, Suspense, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { light, dark } from "./utils/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CircularProgress } from "@mui/material";

const Home = lazy(() => import("./pages/Home"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const PostDetail = lazy(() => import("./pages/PostDetail"));

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-y: hidden;
  overflow-x: hidden;
  transition: all 0.2s ease;
`;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
`;

function App() {
  const [theme, setTheme] = useState(dark);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === dark ? light : dark));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Wrapper>
          <BrowserRouter>
            <Navbar toggleTheme={toggleTheme} theme={theme} />
            <Suspense
              fallback={
                <div className="flex justify-center items-center p-10">
                  <CircularProgress />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<CreatePost />} />
                <Route path="/post/:id" element={<PostDetail />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
