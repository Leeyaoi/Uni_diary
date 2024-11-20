import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

const TeacherDrawerMenu = ({
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
      <ListItem key={"timetable"} disablePadding>
        <ListItemButton
          onClick={() => {
            handleClick("/teacher/timetable");
          }}
        >
          <ListItemText primary={"Расписание"} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default TeacherDrawerMenu;
