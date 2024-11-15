import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../shared/stores/store";
import { teacherActions } from "../../../shared/stores/teacherSlice";
import TeacherType from "../../../shared/types/teacher";

const EditTeacherDialog = ({
  open,
  handleClose,
  id,
}: {
  open: boolean;
  handleClose: () => void;
  id: string;
}) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");

  useEffect(() => {
    if (id != "") {
      dispatch(teacherActions.getTeacherById(id)).then((value) => {
        const item = value.payload as TeacherType;
        if (item != ({} as TeacherType)) {
          setName(item.name);
          setSurname(item.surname);
          setJobTitle(item.jobTitle);
          setLogin(item.user.login);
          setPassword(item.user.password);
          setUserid(item.user.id);
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
            teacherActions.updateTeacher({
              id: id,
              name: name,
              surname: surname,
              jobTitle: jobTitle,
              user: {
                login: login,
                password: password,
                id: userid,
              },
            })
          );
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
        <TextField
          required
          margin="dense"
          fullWidth
          variant="standard"
          label="Должность"
          value={jobTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setJobTitle(event.target.value);
          }}
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

export default EditTeacherDialog;
