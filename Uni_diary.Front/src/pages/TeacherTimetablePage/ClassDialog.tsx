import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ClassDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      closeAfterTransition={false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Что вы хотите сделать?</DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            navigate("/attendance");
          }}
        >
          Отметить отсутствующих
        </Button>
        <Button
          onClick={() => {
            handleClose();
            navigate("/marks");
          }}
        >
          Добавить оценки
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassDialog;
