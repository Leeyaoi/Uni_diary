import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../../shared/stores/store";
import { groupActions } from "../../../shared/stores/groupSlice";

const CreateGroupDialog = ({
  open,
  handleClose,
  professionId,
}: {
  open: boolean;
  handleClose: () => void;
  professionId: string;
}) => {
  const dispatch = useAppDispatch();

  const [year, setYear] = useState(0);
  const [num, setNum] = useState(0);

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
            groupActions.createGroup({
              year: year,
              num: num,
              professionId: professionId,
            })
          );
          handleClose();
        },
      }}
    >
      <DialogTitle>Создать</DialogTitle>
      <DialogContent>
        <TextField
          type="number"
          required
          margin="dense"
          fullWidth
          variant="standard"
          label="Год"
          value={year}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setYear(Number(event.target.value));
          }}
        />
        <TextField
          required
          type="number"
          margin="dense"
          fullWidth
          variant="standard"
          label="Номер"
          value={num}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNum(Number(event.target.value));
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

export default CreateGroupDialog;
