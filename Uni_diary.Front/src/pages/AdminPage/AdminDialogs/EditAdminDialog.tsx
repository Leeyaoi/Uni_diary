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
import { AdminActions } from "../../../shared/stores/adminSlice";
import AdminType from "../../../shared/types/admin";
import { userActions } from "../../../shared/stores/userSlice";

const EditAdminDialog = ({
  open,
  handleClose,
  id,
}: {
  open: boolean;
  handleClose: () => void;
  id: string;
}) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");

  useEffect(() => {
    if (id != "") {
      dispatch(AdminActions.getAdminById(id)).then((value) => {
        const item = value.payload as AdminType;
        if (item != ({} as AdminType)) {
          setName(item.name);
          setSurname(item.surname);
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
            AdminActions.updateAdmin({
              id: id,
              name: name,
              surname: surname,
              user: {
                login: login,
                password: password,
                id: userid,
              },
            })
          );

          if (currentUser!.id == id) {
            dispatch(
              userActions.userLogin({ login: login, password: password })
            );
          }
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

export default EditAdminDialog;
