import React, { useCallback, useEffect, useState } from "react";
import "./TimetablePage.scss";
import {
  Autocomplete,
  debounce,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { groupActions } from "../../shared/stores/groupSlice";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { timetableActions } from "../../shared/stores/timetableSlice";
import WeekDay from "./WeekDay";
import CreateClassDialog from "./ClassDialogs/CreateClassDialog";
import EditClassDialog from "./ClassDialogs/EditClassDialog";
import DeleteClassDialog from "./ClassDialogs/DeleteClassDialog";

const TimetablePage = () => {
  const dispatch = useAppDispatch();
  const foundGroups = useAppSelector((state) => state.group.foundGroups);
  const timetables = useAppSelector((state) => state.timetable.Timetables);

  const [classId, setClassId] = useState("");
  const [timetableId, setTimetableId] = useState("");
  const [number, setNumber] = useState(1);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [bottomWeek, setBottomWeek] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClose = () => {
    setOpenCreate(false);
    setOpenEdit(false);
    setOpenDelete(false);
  };

  const handleOpenCreate = (timetableId: string, number: number) => {
    setTimetableId(timetableId);
    setNumber(number);
    setOpenCreate(true);
  };

  const handleOpenEdit = (
    timetableId: string,
    number: number,
    classId: string
  ) => {
    setTimetableId(timetableId);
    setClassId(classId);
    setNumber(number);
    setOpenEdit(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBottomWeek(event.target.checked);
  };

  const getOptionsDelayed = useCallback(
    debounce(async (newValue: string) => {
      dispatch(groupActions.findGroup(newValue));
    }, 400),
    []
  );

  useEffect(() => {
    dispatch(
      timetableActions.fetchTimetables({
        groupId: groupId ?? "",
        bottomWeek: bottomWeek,
      })
    );
  }, [bottomWeek, groupId, openCreate, openEdit, openDelete]);

  return (
    <div id="timetable">
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
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography>Верхняя неделя</Typography>
        <Switch checked={bottomWeek} onChange={handleChange} />
        <Typography>Нижняя неделя</Typography>
      </Stack>
      <Stack spacing={2}>
        {timetables.map((value) => (
          <WeekDay
            timetable={value}
            handleOpenCreate={handleOpenCreate}
            handleOpenEdit={handleOpenEdit}
            key={value.id}
          />
        ))}
      </Stack>
      <CreateClassDialog
        open={openCreate}
        handleClose={handleClose}
        number={number}
        timetableId={timetableId}
      />
      <EditClassDialog
        open={openEdit}
        handleClose={handleClose}
        id={classId}
        timetableId={timetableId}
        number={number}
        setOpenDelete={setOpenDelete}
      />
      <DeleteClassDialog
        id={classId}
        open={openDelete}
        handleClose={handleClose}
      />
    </div>
  );
};

export default TimetablePage;
