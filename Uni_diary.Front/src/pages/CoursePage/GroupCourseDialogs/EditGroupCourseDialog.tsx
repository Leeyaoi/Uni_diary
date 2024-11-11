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
import { GroupCourseActions } from "../../../shared/stores/groupCourseSlice";
import GroupCourseType from "../../../shared/types/groupCourse";

const EditGroupCourseDialog = ({
  open,
  handleClose,
  courseId,
  id,
}: {
  open: boolean;
  handleClose: () => void;
  courseId: string;
  id: string;
}) => {
  const dispatch = useAppDispatch();

  const [GroupId, setGroupId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [hours, setHours] = useState(0);

  useEffect(() => {
    if (id != "") {
      dispatch(GroupCourseActions.getGroupCourseById(id)).then((value) => {
        const item = value.payload as GroupCourseType;
        if (item != ({} as GroupCourseType)) {
          setHours(item.hours);
          setGroupId(item.group.id);
          setQuery(
            item.group.profession.name +
              "-" +
              (item.group.year % 100) +
              item.group.num
          );
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
            GroupCourseActions.updateGroupCourse({
              id: id,
              groupId: GroupId ?? "",
              courseId: courseId,
              hours: hours,
            })
          );
          handleClose();
        },
      }}
    >
      <DialogTitle>Изменить</DialogTitle>
      <DialogContent>
        <p>{query}</p>
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

export default EditGroupCourseDialog;
