import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  debounce,
  Autocomplete,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/stores/store";
import { TeacherCourseActions } from "../../../shared/stores/teacherCourseSlice";
import { teacherActions } from "../../../shared/stores/teacherSlice";

const CreateTeacherCourseDialog = ({
  open,
  handleClose,
  courseId,
}: {
  open: boolean;
  handleClose: () => void;
  courseId: string;
}) => {
  const dispatch = useAppDispatch();
  const foundTeachers = useAppSelector((state) => state.teacher.foundTeachers);

  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [hours, setHours] = useState(0);

  const getOptionsDelayed = useCallback(
    debounce(async (newValue: string) => {
      dispatch(teacherActions.findTeacher(newValue));
    }, 400),
    []
  );

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
            TeacherCourseActions.createTeacherCourse({
              teacherId: teacherId ?? "",
              courseId: courseId,
              hours: hours,
            })
          );
          handleClose();
        },
      }}
    >
      <DialogTitle>Создать</DialogTitle>
      <DialogContent>
        <Autocomplete
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
          inputValue={query}
          onInputChange={(event: any, newInputValue) => {
            setQuery(newInputValue);
            getOptionsDelayed(newInputValue);
          }}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Преподаватель" />
          )}
        />
        <TextField
          required
          type="number"
          margin="dense"
          fullWidth
          variant="standard"
          label="Часы"
          value={hours}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setHours(Number(event.target.value));
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button type="submit">Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTeacherCourseDialog;
