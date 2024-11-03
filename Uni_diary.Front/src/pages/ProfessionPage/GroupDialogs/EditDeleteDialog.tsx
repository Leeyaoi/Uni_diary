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
import GroupType from "../../../shared/types/group";
import { groupActions } from "../../../shared/stores/groupSlice";

const EditGroupDialog = ({
  open,
  handleClose,
  id,
}: {
  open: boolean;
  handleClose: () => void;
  id: string;
}) => {
  const dispatch = useAppDispatch();

  const [year, setYear] = useState(0);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (id != "") {
      dispatch(groupActions.getGroupById(id)).then((value) => {
        const item = value.payload as GroupType;
        if (item != ({} as GroupType)) {
          setYear(item.year);
          setNum(item.num);
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
            groupActions.updateGroup({
              id: id,
              year: year,
              num: num,
            })
          );
          handleClose();
        },
      }}
    >
      <DialogTitle>Изменить</DialogTitle>
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

export default EditGroupDialog;
