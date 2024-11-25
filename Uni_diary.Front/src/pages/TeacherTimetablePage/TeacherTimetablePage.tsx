import { Stack, Typography, Switch, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import TeacherWeekDay from "./TeacherWeekDay";
import { classActions } from "../../shared/stores/classSlice";
import weekDays from "../../shared/types/weekDays";
import ClassDialog from "./ClassDialog";
import ClassType from "../../shared/types/class";

const TeacherTimetablePage = () => {
  const dispatch = useAppDispatch();
  const teachersClasses = useAppSelector((state) => [
    state.class.upTeachersClasses,
    state.class.bottomTeachersClasses,
  ]);
  const teacherId = useAppSelector((state) => state.user.currentUser?.id);

  const [bottomWeek, setBottomWeek] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = (selectedClass: ClassType) => {
    dispatch(classActions.setClass(selectedClass));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBottomWeek(event.target.checked);
  };

  useEffect(() => {
    dispatch(
      classActions.fetchTeachersClasses({
        teacherId: teacherId ?? "",
      })
    );
  }, []);

  return (
    <div id="timetable">
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography>Верхняя неделя</Typography>
        <Switch checked={bottomWeek} onChange={handleChange} />
        <Typography>Нижняя неделя</Typography>
      </Stack>
      <Button
        id="button"
        variant="contained"
        onClick={() => {
          window.open(window.location.href + "Pdf");
        }}
      >
        Скачать PDF
      </Button>
      <Stack spacing={2}>
        {Array.isArray(teachersClasses[bottomWeek ? 1 : 0])
          ? teachersClasses[bottomWeek ? 1 : 0].map((value, index) => (
              <TeacherWeekDay
                classes={value}
                day={index}
                handleClick={handleClick}
                key={weekDays[index]}
              />
            ))
          : ""}
      </Stack>
      <ClassDialog open={open} handleClose={handleClose} />
    </div>
  );
};

export default TeacherTimetablePage;
