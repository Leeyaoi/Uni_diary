import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

const StudentDrawerMenu = ({
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
            handleClick("/timetable");
          }}
        >
          <ListItemText primary={"Расписание"} />
        </ListItemButton>
      </ListItem>
      <ListItem key={"marks"} disablePadding>
        <ListItemButton
          onClick={() => {
            handleClick("/student/marks");
          }}
        >
          <ListItemText primary={"Оценки"} />
        </ListItemButton>
      </ListItem>
      <ListItem key={"attendance"} disablePadding>
        <ListItemButton
          onClick={() => {
            handleClick("/student/attendance");
          }}
        >
          <ListItemText primary={"Посещаемость"} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default StudentDrawerMenu;
