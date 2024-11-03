import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./index.scss";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfessionPage from "./pages/ProfessionPage/ProfessionPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profession" element={<ProfessionPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
