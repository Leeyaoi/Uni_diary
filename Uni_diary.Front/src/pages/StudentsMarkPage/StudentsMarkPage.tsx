import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { MarkActions } from "../../shared/stores/markSlice";
import { Button, Stack } from "@mui/material";
import { userTypeEnum } from "../../shared/types/userTypeEnum";
import CourseMarks from "./CourseMarks";
import "./StudentsMarkPage.scss";

const StudentsMarkPage = () => {
  const dispatch = useAppDispatch();
  const studentsMarks = useAppSelector((state) => state.mark.studentsMarks);
  const [user, type] = useAppSelector((state) => [
    state.user.currentUser,
    state.user.userType,
  ]) as any;

  useEffect(() => {
    if (type == userTypeEnum.student) {
      dispatch(MarkActions.getMarkByStudent(user.id));
    }
  }, []);

  return (
    <div id="attendance">
      <Button
        sx={{ marginTop: "1rem" }}
        id="button"
        variant="contained"
        onClick={() => {
          window.open(window.location.href + "Pdf");
        }}
      >
        Скачать PDF
      </Button>
      <Stack spacing={0} id="courseMarksPage">
        <Stack direction={"row"} id="courseMarks">
          <div id="courseName">Предмет</div>
          <div id="marksHeader">Оценки</div>
          <div id="averMark">Среднее</div>
        </Stack>
        {Array.isArray(studentsMarks)
          ? studentsMarks.map((value) => (
              <CourseMarks key={value.id} course={value.course} />
            ))
          : ""}
      </Stack>
    </div>
  );
};

export default StudentsMarkPage;
