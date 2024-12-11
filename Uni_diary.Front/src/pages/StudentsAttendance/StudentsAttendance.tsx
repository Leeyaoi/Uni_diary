import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { Button, Stack } from "@mui/material";
import { userTypeEnum } from "../../shared/types/userTypeEnum";
import { attendanceActions } from "../../shared/stores/attendanceSlice";

const StudentsAttendance = () => {
  const dispatch = useAppDispatch();
  const studentsAttendance = useAppSelector(
    (state) => state.attendance.studentsAttendance
  );
  const [user, type] = useAppSelector((state) => [
    state.user.currentUser,
    state.user.userType,
  ]) as any;

  useEffect(() => {
    if (type == userTypeEnum.student) {
      dispatch(attendanceActions.getAttendanceByStudent(user.id));
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
          <div id="marksHeader">Даты пропусков</div>
          <div id="averMark">Общее количество часов</div>
        </Stack>
        {Array.isArray(studentsAttendance)
          ? studentsAttendance.map((value) => (
              <Stack direction={"row"} id="courseMarks" key={value.id}>
                <div id="courseName">{value.course.name}</div>
                <div id="marksHeader">
                  {Array.isArray(value.course.attendances)
                    ? value.course.attendances.map((a, i) => (
                        <span
                          style={{ border: "none", margin: 0, padding: 0 }}
                          key={i}
                        >
                          {a.dateWhen}{" "}
                        </span>
                      ))
                    : ""}
                </div>
                <div id="averMark">
                  {Array.isArray(value.course.attendances)
                    ? value.course.attendances.length * 2
                    : ""}
                </div>
              </Stack>
            ))
          : ""}
      </Stack>
    </div>
  );
};

export default StudentsAttendance;
