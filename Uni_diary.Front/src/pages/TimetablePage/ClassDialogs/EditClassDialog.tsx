import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Autocomplete,
  Checkbox,
  debounce,
  FormControlLabel,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/stores/store";
import { classActions } from "../../../shared/stores/classSlice";
import ClassType from "../../../shared/types/class";
import { CourseActions } from "../../../shared/stores/courseSlice";
import { teacherActions } from "../../../shared/stores/teacherSlice";

const EditClassDialog = ({
  open,
  handleClose,
  timetableId,
  number,
  id,
  setOpenDelete,
}: {
  open: boolean;
  handleClose: () => void;
  timetableId: string;
  number: number;
  id: string;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const foundTeachers = useAppSelector((state) => state.teacher.foundTeachers);
  const courses = useAppSelector((state) => state.course.courses);

  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [teacherQuery, setTeacherQuery] = useState("");
  const [courseId, setCourseId] = useState<string | null>(null);
  const [courseQuery, setCourseQuery] = useState("");

  const [fullGroup, setFullGroup] = useState(true);
  const [firstHalf, setFirstHalf] = useState(false);
  const [building, setBuilding] = useState(1);
  const [hall, setHall] = useState(0);

  const [currentTeacherName, setCurrentTeacherName] = useState("");
  const [currentCourseName, setCurrentCourseName] = useState("");

  const getTeachersOptionsDelayed = useCallback(
    debounce(async (newValue: string) => {
      dispatch(teacherActions.findTeacher(newValue));
    }, 400),
    []
  );

  const getCoursesOptionsDelayed = useCallback(
    debounce(async (newValue: string) => {
      dispatch(CourseActions.fetchCourses(newValue));
    }, 400),
    []
  );

  useEffect(() => {
    if (id != "") {
      dispatch(classActions.getClassById(id)).then((value) => {
        const item = value.payload as ClassType;
        if (item != ({} as ClassType)) {
          setBuilding(item.building);
          setHall(item.hall);
          setFullGroup(item.fullGroup);
          setFirstHalf(item.firstHalf);
          setTeacherQuery(item.teacher.name + " " + item.teacher.surname);
          setTeacherId(item.teacher.id);
          setCurrentTeacherName(item.teacher.name + " " + item.teacher.surname);
          setCourseId(item.course.id);
          setCourseQuery(item.course.name);
          setCurrentCourseName(item.course.name);
        }
      });
    }
  }, [id]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      closeAfterTransition={false}
      PaperProps={{
        component: "form",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          await dispatch(
            classActions.updateClass({
              building: building,
              hall: hall,
              fullGroup: fullGroup,
              firstHalf: firstHalf,
              number: number,
              teacherId: teacherId ?? "",
              timetableId: timetableId,
              courseId: courseId ?? "",
              id: id,
            })
          );
          handleClose();
        },
      }}
    >
      <DialogTitle>Создать</DialogTitle>
      <DialogContent>
        <p>Преподаватель: {currentTeacherName}</p>
        <Autocomplete //teacher
          aria-required
          options={
            foundTeachers && foundTeachers.length
              ? foundTeachers.map(
                  (option) => option.name + " " + option.surname
                )
              : []
          }
          onChange={(event: any, newValue: null | string) => {
            if (newValue == null) {
              setTeacherId(null);
            } else {
              let found = foundTeachers.find(
                (i) => i.name + " " + i.surname == newValue
              );
              setTeacherId(found ? found.id : null);
            }
          }}
          inputValue={teacherQuery}
          onInputChange={(event: any, newInputValue) => {
            setTeacherQuery(newInputValue);
            getTeachersOptionsDelayed(newInputValue);
          }}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Новый преподаватель" />
          )}
        />
        <p>Курс: {currentCourseName}</p>
        <Autocomplete //course
          aria-required
          options={courses.length ? courses.map((option) => option.name) : []}
          onChange={(event: any, newValue: null | string) => {
            if (newValue == null) {
              setCourseId(null);
            } else {
              let found = courses.find((i) => i.name == newValue);
              setCourseId(found ? found.id : null);
            }
          }}
          inputValue={courseQuery}
          onInputChange={(event: any, newInputValue) => {
            setCourseQuery(newInputValue);
            getCoursesOptionsDelayed(newInputValue);
          }}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Новый курс" />}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={fullGroup}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFullGroup(event.target.checked);
              }}
            />
          }
          label="Для целой группы"
        />
        <FormControlLabel
          disabled={fullGroup}
          control={
            <Checkbox
              checked={firstHalf}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFirstHalf(event.target.checked);
              }}
            />
          }
          label="Первая поддгруппа"
        />
        <TextField
          required
          type="numeric"
          margin="dense"
          fullWidth
          variant="standard"
          label="Корпус"
          value={building}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setBuilding(Number(event.target.value));
          }}
        />
        <TextField
          required
          type="numeric"
          margin="dense"
          fullWidth
          variant="standard"
          label="Аудитория"
          value={hall}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setHall(Number(event.target.value));
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button type="submit">Сохранить</Button>
        <Button
          color="error"
          onClick={() => {
            setOpenDelete(true);
          }}
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditClassDialog;
