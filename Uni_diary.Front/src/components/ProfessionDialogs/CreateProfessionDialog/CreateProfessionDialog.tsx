import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../../shared/stores/store";
import { professionActions } from "../../../shared/stores/professionSlice";

const CreateProfessionDialog = ({
  open,
  handleClose,
  facultyId,
}: {
  open: boolean;
  handleClose: () => void;
  facultyId: string;
}) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          await dispatch(
            professionActions.createProfession({
              name: name,
              code: code,
              jobTitle: jobTitle,
              facultyId: facultyId,
            })
          );
          handleClose();
        },
      }}
    >
      <DialogTitle>Создать</DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="dense"
          fullWidth
          variant="standard"
          label="Название"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
        <TextField
          required
          margin="dense"
          fullWidth
          variant="standard"
          label="Код специальности"
          value={code}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCode(event.target.value);
          }}
        />
        <TextField
          required
          margin="dense"
          fullWidth
          variant="standard"
          label="Профессия"
          value={jobTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setJobTitle(event.target.value);
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

export default CreateProfessionDialog;
