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
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/stores/store";
import { TeacherCourseActions } from "../../../shared/stores/teacherCourseSlice";
import { teacherActions } from "../../../shared/stores/teacherSlice";
import TeacherCourseType from "../../../shared/types/teacherCourse";

const EditTeacherCourseDialog = ({
  open,
  handleClose,
  courseId,
  id,
}: {
  open: boolean;
  handleClose: () => void;
  courseId: string;
  id: string;
}) => {
  const dispatch = useAppDispatch();
  const foundTeachers = useAppSelector((state) => state.teacher.foundTeachers);

  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [hours, setHours] = useState(0);

  useEffect(() => {
    if (id != "") {
      dispatch(TeacherCourseActions.getTeacherCourseById(id)).then((value) => {
        const item = value.payload as TeacherCourseType;
        if (item != ({} as TeacherCourseType)) {
          setHours(item.hours);
          setTeacherId(item.teacher.id);
          setQuery(item.teacher.name + " " + item.teacher.surname);
        }
      });
    }
  }, [id]);

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
            TeacherCourseActions.updateTeacherCourse({
              id: id,
              teacherId: teacherId ?? "",
              courseId: courseId,
              hours: hours,
            })
          );
          handleClose();
        },
      }}
    >
      <DialogTitle>Изменить</DialogTitle>
      <DialogContent>
        <p>{query}</p>
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

export default EditTeacherCourseDialog;
