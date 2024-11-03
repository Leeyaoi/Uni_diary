import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { professionActions } from "../../../shared/stores/professionSlice";
import { useAppDispatch } from "../../../shared/stores/store";
import ProfessionType from "../../../shared/types/profession";

const EditProfessionDialog = ({
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
  const [code, setCode] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    if (id != "") {
      dispatch(professionActions.getProfessionById(id)).then((value) => {
        const item = value.payload as ProfessionType;
        if (item != ({} as ProfessionType)) {
          setName(item.name);
          setCode(item.code);
          setJobTitle(item.jobTitle);
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
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          dispatch(
            professionActions.updateProfession({
              id: id,
              code: code,
              name: name,
              jobTitle: jobTitle,
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

export default EditProfessionDialog;
