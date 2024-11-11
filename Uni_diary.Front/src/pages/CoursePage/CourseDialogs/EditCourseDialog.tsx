import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/stores/store";
import { CourseActions } from "../../../shared/stores/courseSlice";
import { userActions } from "../../../shared/stores/userSlice";
import CourseType from "../../../shared/types/course";

const EditCourseDialog = ({
  open,
  handleClose,
  id,
  setSearch,
}: {
  open: boolean;
  handleClose: () => void;
  id: string;
  setSearch: (v: string) => void;
}) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [name, setName] = useState("");

  useEffect(() => {
    if (id != "") {
      dispatch(CourseActions.getCourseById(id)).then((value) => {
        const item = value.payload as CourseType;
        if (item != ({} as CourseType)) {
          setName(item.name);
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
            CourseActions.updateCourse({
              id: id,
              name: name,
            })
          );
          setSearch(name);
          handleClose();
        },
      }}
    >
      <DialogTitle>Изменить</DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="dense"
          fullWidth
          variant="standard"
          label="Название курса"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
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

export default EditCourseDialog;
