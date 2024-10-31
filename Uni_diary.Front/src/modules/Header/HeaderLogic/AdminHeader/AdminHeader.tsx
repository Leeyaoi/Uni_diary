import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      id="headerLogicButton"
      onClick={() => {
        navigate("/profession");
      }}
    >
      Специальности
    </Button>
  );
};

export default AdminHeader;
