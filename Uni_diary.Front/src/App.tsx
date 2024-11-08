import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./index.scss";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfessionPage from "./pages/ProfessionPage/ProfessionPage";
import Header from "./modules/Header/Header";
import { Container } from "@mui/material";
import Footer from "./modules/Footer/Footer";
import FacultyPage from "./pages/FacultyPage/FacultyPage";
import TeacherPage from "./pages/TeacherPage/TeacherPage";

const App = () => {
  return (
    <BrowserRouter>
      <Container className="container">
        <Header />
        <div id="content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/professions" element={<FacultyPage />} />
            <Route path="/teachers" element={<TeacherPage />} />
            <Route
              path="/profession/:professionId"
              element={<ProfessionPage />}
            />
          </Routes>
        </div>
        <Footer />
      </Container>
    </BrowserRouter>
  );
};

export default App;
