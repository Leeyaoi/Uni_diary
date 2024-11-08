import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../shared/stores/store";
import { teacherActions } from "../../../shared/stores/teacherSlice";

const DeleteTeacherDialog = ({
  open,
  handleClose,
  id,
}: {
  open: boolean;
  handleClose: () => void;
  id: string;
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
            await dispatch(teacherActions.deleteTeacher(id));
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

export default DeleteTeacherDialog;
