import {
  Alert,
  Button,
  Checkbox,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import "./AttendancePage.scss";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { studentActions } from "../../shared/stores/studentSlice";
import StudentType from "../../shared/types/student";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { attendanceActions } from "../../shared/stores/attendanceSlice";

const AttendancePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.attendance.error);
  const loading = useAppSelector((state) => state.attendance.loading);
  const groupId = useAppSelector(
    (state) => state.class.selectedClass.timetable.group.id
  );
  const courseId = useAppSelector(
    (state) => state.class.selectedClass.course.id
  );
  const lection = useAppSelector((state) => state.class.selectedClass.lection);
  const students = useAppSelector((state) => state.student.students);
  const AttendedStudents = useAppSelector(
    (state) => state.attendance.AttendedStudents
  );

  const [open, setOpen] = useState(false);
  const [personName, setPersonName] = useState<StudentType[]>([]);
  const [date, setDate] = React.useState<Dayjs>(dayjs());

  const handleChange = (value: StudentType) => {
    if (personName.includes(value)) {
      setPersonName(personName.filter((n) => n != value));
    } else {
      setPersonName([...personName, value]);
    }
  };

  useEffect(() => {
    dispatch(
      studentActions.fetchStudents({
        limit: 100,
        page: 1,
        groupId: groupId,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(attendanceActions.getAttendance({ dateWhen: date, courseId }));
  }, [date]);

  useEffect(() => {
    setPersonName(AttendedStudents);
  }, [AttendedStudents]);

  return (
    <div id="attendance">
      <Button
        id="return_button"
        variant="contained"
        onClick={() => {
          navigate("/teacher/timetable");
        }}
      >
        <ArrowBackIcon />
      </Button>
      <p>Отметьте тех, кого сегодня нет:</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Дата"
          value={date}
          onChange={(newValue) => setDate(newValue ?? dayjs())}
        />
      </LocalizationProvider>

      <List id="studentsList">
        {Array.isArray(students.items) && students.items.length > 0
          ? students.items.map((student) => (
              <ListItem
                key={student.id}
                onClick={() => {
                  handleChange(student);
                }}
              >
                <ListItemText primary={student.name + " " + student.surname} />
                <Checkbox
                  checked={
                    personName.find((s) => s.id == student.id) != undefined
                  }
                />
              </ListItem>
            ))
          : ""}
      </List>
      <Button
        variant="contained"
        id="save"
        onClick={() => {
          setOpen(true);
          dispatch(
            attendanceActions.postAttendance({
              dateWhen: date,
              courseId: courseId,
              students: personName,
              lection: lection,
            })
          );
        }}
      >
        Сохранить
      </Button>
      <p></p>
      <Button
        id="button"
        variant="contained"
        onClick={() => {
          window.open(window.location.href + "Pdf");
        }}
      >
        Скачать PDF
      </Button>
      <Collapse in={open && loading == false && !error}>
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Сохранено успешно
        </Alert>
      </Collapse>
    </div>
  );
};

export default AttendancePage;
