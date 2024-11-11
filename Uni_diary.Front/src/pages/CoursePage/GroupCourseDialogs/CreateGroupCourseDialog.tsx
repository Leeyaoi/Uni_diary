import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  debounce,
  Autocomplete,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/stores/store";
import { GroupCourseActions } from "../../../shared/stores/groupCourseSlice";
import { groupActions } from "../../../shared/stores/groupSlice";

const CreateGroupCourseDialog = ({
  open,
  handleClose,
  courseId,
}: {
  open: boolean;
  handleClose: () => void;
  courseId: string;
}) => {
  const dispatch = useAppDispatch();
  const foundGroups = useAppSelector((state) => state.group.foundGroups);

  const [GroupId, setGroupId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [hours, setHours] = useState(0);

  const getOptionsDelayed = useCallback(
    debounce(async (newValue: string) => {
      dispatch(groupActions.findGroup(newValue));
    }, 400),
    []
  );

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
            GroupCourseActions.createGroupCourse({
              groupId: GroupId ?? "",
              courseId: courseId,
              hours: hours,
            })
          );
          handleClose();
        },
      }}
    >
      <DialogTitle>Создать</DialogTitle>
      <DialogContent>
        <Autocomplete
          aria-required
          options={
            foundGroups && foundGroups.length
              ? foundGroups.map(
                  (option) =>
                    option.profession.name +
                    "-" +
                    (option.year % 100) +
                    option.num
                )
              : []
          }
          onChange={(event: any, newValue: null | string) => {
            if (newValue == null) {
              setGroupId(null);
            } else {
              let found = foundGroups.find(
                (i) =>
                  i.profession.name + "-" + (i.year % 100) + i.num == newValue
              );
              setGroupId(found ? found.id : null);
            }
          }}
          inputValue={query}
          onInputChange={(event: any, newInputValue) => {
            setQuery(newInputValue);
            getOptionsDelayed(newInputValue);
          }}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Группа" />}
        />
        <TextField
          required
          type="number"
          margin="dense"
          fullWidth
          variant="standard"
          label="Часы"
          value={hours}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setHours(Number(event.target.value));
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

export default CreateGroupCourseDialog;
