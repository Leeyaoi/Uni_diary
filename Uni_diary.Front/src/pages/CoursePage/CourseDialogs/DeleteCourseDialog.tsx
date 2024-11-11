import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../shared/stores/store";
import { CourseActions } from "../../../shared/stores/courseSlice";

const DeleteCourseDialog = ({
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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      closeAfterTransition={false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Вы уверены что хотите удалить эту запись?
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={async () => {
            await dispatch(CourseActions.deleteCourse(id));
            setSearch("");
            handleClose();
          }}
        >
          Да
        </Button>
        <Button onClick={handleClose} autoFocus>
          Нет
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCourseDialog;
