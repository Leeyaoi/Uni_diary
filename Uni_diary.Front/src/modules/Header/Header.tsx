import React from "react";
import "./Header.scss";
import { Button } from "@mui/material";
import { useAppSelector } from "../../shared/stores/store";
import { userTypeEnum } from "../../shared/types/userTypeEnum";
import { useNavigate } from "react-router-dom";
import HeaderLogic from "./HeaderLogic/HeaderLogic";

const Header = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  return (
    <div className="header">
      <img src="../../../assets/logo.png" alt="БРУ" id="logo" />
      <HeaderLogic />
      <Button
        variant="outlined"
        id="headerButton"
        onClick={() => {
          if (user) {
            navigate("/profile");
          } else {
            navigate("/login");
          }
        }}
      >
        {user ? "Профиль" : "Войти"}
      </Button>
    </div>
  );
};

export default Header;
