import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
} from "@mui/material";
import React from "react";
import ClassType from "../../../shared/types/class";
import weekDays from "../../../shared/types/weekDays";

const ConflictsDialog = ({
  open,
  handleClose,
  conflicts,
}: {
  open: boolean;
  handleClose: () => void;
  conflicts: (ClassType | null)[];
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      closeAfterTransition={false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Были найдены конфликты</DialogTitle>
      <DialogContent>
        {conflicts[0] ? (
          <>
            <p>
              {conflicts[0].timetable.day > 7
                ? "Нижняя неделя:"
                : "Верхняя неделя:"}
            </p>
            <p>{weekDays[(conflicts[0].timetable.day % 7) - 1]}</p>
            <p>
              {conflicts[0].course.name} {conflicts[0].teacher.surname}
              {conflicts[0].hall}/{conflicts[0].building}`
            </p>
          </>
        ) : (
          ""
        )}
        {conflicts[1] ? (
          <>
            <p>
              {conflicts[1].timetable.day > 7
                ? "Нижняя неделя:"
                : "Верхняя неделя:"}
            </p>
            <p>{weekDays[(conflicts[1].timetable.day % 7) - 1]}</p>
            <p>
              {conflicts[1].course.name} {conflicts[1].teacher.surname}
              {conflicts[1].hall}/{conflicts[1].building}
            </p>
          </>
        ) : (
          ""
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Ок
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConflictsDialog;
