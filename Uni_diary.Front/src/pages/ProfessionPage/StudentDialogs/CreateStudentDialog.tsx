import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../../shared/stores/store";
import { studentActions } from "../../../shared/stores/studentSlice";

const CreateStudentDialog = ({
  open,
  handleClose,
  groupId,
}: {
  open: boolean;
  handleClose: () => void;
  groupId: string;
}) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [budget, setBudget] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

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
            studentActions.createStudent({
              name: name,
              surname: surname,
              budget: budget,
              login: login,
              password: password,
              groupId: groupId,
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
          label="Имя"
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
          label="Фамилия"
          value={surname}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSurname(event.target.value);
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={budget}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setBudget(event.target.checked);
              }}
            />
          }
          label="Бюджет"
        />
        <TextField
          required
          margin="dense"
          fullWidth
          variant="standard"
          label="Логин"
          value={login}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setLogin(event.target.value);
          }}
        />
        <TextField
          required
          margin="dense"
          fullWidth
          variant="standard"
          label="Пароль"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
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

export default CreateStudentDialog;
