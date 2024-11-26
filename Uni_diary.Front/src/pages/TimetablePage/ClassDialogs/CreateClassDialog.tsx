import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Autocomplete,
  debounce,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/stores/store";
import { classActions } from "../../../shared/stores/classSlice";
import { teacherActions } from "../../../shared/stores/teacherSlice";
import { CourseActions } from "../../../shared/stores/courseSlice";
import ConflictsDialog from "./ConflictsDialog";

const CreateClassDialog = ({
  open,
  handleClose,
  timetableId,
  number,
}: {
  open: boolean;
  handleClose: () => void;
  timetableId: string;
  number: number;
}) => {
  const dispatch = useAppDispatch();
  const foundTeachers = useAppSelector((state) => state.teacher.foundTeachers);
  const courses = useAppSelector((state) => state.course.courses);
  const conflicts = useAppSelector((state) => state.class.conflicts);

  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [teacherQuery, setTeacherQuery] = useState("");
  const [courseId, setCourseId] = useState<string | null>(null);
  const [courseQuery, setCourseQuery] = useState("");
  const [openConflicts, setOpenConflicts] = useState(false);

  const [fullGroup, setFullGroup] = useState(true);
  const [firstHalf, setFirstHalf] = useState(false);
  const [forBothWeeks, setForBothWeeks] = useState(false);
  const [building, setBuilding] = useState(1);
  const [hall, setHall] = useState(0);
  const [lection, setLection] = useState(false);

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

  const handleConflicts = () => {
    if (
      Array.isArray(conflicts) &&
      (conflicts[0] != null || conflicts[1] != null)
    ) {
      console.log(conflicts);
      setOpenConflicts(true);
    } else {
      handleClose();
    }
  };

  useEffect(handleConflicts, [conflicts]);

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
            classActions.createClass({
              building: building,
              hall: hall,
              fullGroup: fullGroup,
              firstHalf: firstHalf,
              number: number,
              forBothWeeks: forBothWeeks,
              teacherId: teacherId ?? "",
              timetableId: timetableId,
              courseId: courseId ?? "",
              lection: lection,
            })
          );
        },
      }}
    >
      <DialogTitle>Создать</DialogTitle>
      <DialogContent>
        <div id="textField">
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
              <TextField {...params} label="Преподаватель" />
            )}
          />
        </div>
        <div id="textField">
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
            renderInput={(params) => <TextField {...params} label="Курс" />}
          />
        </div>
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
        <FormControlLabel
          control={
            <Checkbox
              checked={lection}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLection(event.target.checked);
              }}
            />
          }
          label="Лекция"
        />
        <TextField
          required
          type="numeric"
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
          fullWidth
          variant="standard"
          label="Аудитория"
          value={hall}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setHall(Number(event.target.value));
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={forBothWeeks}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setForBothWeeks(event.target.checked);
              }}
            />
          }
          label="На обе недели"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button type="submit">Сохранить</Button>
      </DialogActions>
      <ConflictsDialog
        open={openConflicts}
        handleClose={() => {
          setOpenConflicts(false);
        }}
        conflicts={conflicts}
      />
    </Dialog>
  );
};

export default CreateClassDialog;
