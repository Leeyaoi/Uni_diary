import React, { Dispatch, SetStateAction } from "react";
import "./Header.scss";
import { Button } from "@mui/material";
import { useAppSelector } from "../../shared/stores/store";
import { useNavigate } from "react-router-dom";

const Header = ({
  setOpen,
  open,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) => {
  const user = useAppSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  return (
    <div className="header">
      <Button
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img src="../../../assets/logo.png" alt="БРУ" id="logo" />
      </Button>
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
