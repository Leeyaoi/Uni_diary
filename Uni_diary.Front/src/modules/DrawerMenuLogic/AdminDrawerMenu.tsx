import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDrawerMenu = () => {
  const navigate = useNavigate();
  return (
    <List>
      <ListItem key={"professions"} disablePadding>
        <ListItemButton
          onClick={() => {
            navigate("/professions");
          }}
        >
          <ListItemText primary={"Специальности"} />
        </ListItemButton>
      </ListItem>
      <ListItem key={"teachers"} disablePadding>
        <ListItemButton
          onClick={() => {
            navigate("/teachers");
          }}
        >
          <ListItemText primary={"Преподаватели"} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default AdminDrawerMenu;
