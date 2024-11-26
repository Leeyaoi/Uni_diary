import {
  Alert,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { studentActions } from "../../shared/stores/studentSlice";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./MarksPage.scss";
import { MarkActions } from "../../shared/stores/markSlice";
import MarkType from "../../shared/types/mark";
import { GroupCourseActions } from "../../shared/stores/groupCourseSlice";

const MarksPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.mark.error);
  const loading = useAppSelector((state) => state.mark.loading);
  const students = useAppSelector((state) => state.student.students);
  const groupId = useAppSelector(
    (state) => state.class.selectedClass.timetable.group.id
  );
  const courseId = useAppSelector(
    (state) => state.class.selectedClass.course.id
  );
  const fetchedMarks = useAppSelector((state) => state.mark.fetchedMarks);

  const [marks, setMarks] = useState<MarkType[]>([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs>(dayjs());

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    const newValue = event.target.value as any as number;
    setMarks([...marks, { studentId: id, mark: newValue } as MarkType]);
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
    dispatch(MarkActions.getMark({ dateWhen: date, courseId }));
  }, [date]);

  useEffect(() => {
    setMarks(fetchedMarks);
  }, [fetchedMarks]);

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
      <p>Проставьте оценки за дату:</p>
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
              <ListItem key={student.id}>
                <ListItemText primary={student.name + " " + student.surname} />
                <TextField
                  type="number"
                  id="markInput"
                  value={
                    marks.find((m) => m.studentId == student.id)
                      ? marks.find((m) => m.studentId == student.id)?.mark
                      : "-"
                  }
                  onChange={(event) => {
                    handleChange(event, student.id);
                  }}
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
            MarkActions.postMark({
              dateWhen: date,
              courseId: courseId,
              students: marks,
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
        onClick={async () => {
          await dispatch(
            GroupCourseActions.setSelectedGroupCourse({ groupId, courseId })
          );
          window.open(
            window.location.href.replace("marks", "cources/marksPdf")
          );
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

export default MarksPage;
