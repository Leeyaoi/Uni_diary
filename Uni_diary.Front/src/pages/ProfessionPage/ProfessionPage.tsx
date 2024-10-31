import { Container } from "@mui/material";
import React from "react";
import Header from "../../modules/Header/Header";
import Footer from "../../modules/Footer/Footer";
import "./ProfessionPage.scss";

const ProfessionPage = () => {
  return (
    <Container className="container">
      <Header />
      <div id="content">
        <div id="profession">Profession</div>
      </div>
      <Footer />
    </Container>
  );
};

export default ProfessionPage;
