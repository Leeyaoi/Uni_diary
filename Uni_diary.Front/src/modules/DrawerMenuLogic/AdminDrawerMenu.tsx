import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

const AdminDrawerMenu = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
    setOpen(false);
  };
  return (
    <List>
      <ListItem key={"professions"} disablePadding>
        <ListItemButton
          onClick={() => {
            handleClick("/professions");
          }}
        >
          <ListItemText primary={"Специальности"} />
        </ListItemButton>
      </ListItem>
      <ListItem key={"teachers"} disablePadding>
        <ListItemButton
          onClick={() => {
            handleClick("/teachers");
          }}
        >
          <ListItemText primary={"Преподаватели"} />
        </ListItemButton>
      </ListItem>
      <ListItem key={"admins"} disablePadding>
        <ListItemButton
          onClick={() => {
            handleClick("/admins ");
          }}
        >
          <ListItemText primary={"Администраторы"} />
        </ListItemButton>
      </ListItem>
      <ListItem key={"cources"} disablePadding>
        <ListItemButton
          onClick={() => {
            handleClick("/cources ");
          }}
        >
          <ListItemText primary={"Курсы"} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default AdminDrawerMenu;
