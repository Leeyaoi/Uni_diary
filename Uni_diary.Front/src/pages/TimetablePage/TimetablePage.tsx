import React, { useCallback, useState } from "react";
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

const TimetablePage = () => {
  const dispatch = useAppDispatch();
  const foundGroups = useAppSelector((state) => state.group.foundGroups);

  const [GroupId, setGroupId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const getOptionsDelayed = useCallback(
    debounce(async (newValue: string) => {
      dispatch(groupActions.findGroup(newValue));
    }, 400),
    []
  );

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
        <Switch checked={checked} onChange={handleChange} />
        <Typography>Нижняя неделя</Typography>
      </Stack>
      <Stack spacing={2}>
        <div className="weekDay">
          <strong>Понедельник</strong>
          <Stack>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
          </Stack>
        </div>
        <div className="weekDay">
          <strong>Вторник</strong>
          <Stack>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
          </Stack>
        </div>
        <div className="weekDay">
          <strong>Среда</strong>
          <Stack>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
          </Stack>
        </div>
        <div className="weekDay">
          <strong>Четверг</strong>
          <Stack>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
          </Stack>
        </div>
        <div className="weekDay">
          <strong>Пятница</strong>
          <Stack>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
          </Stack>
        </div>
        <div className="weekDay">
          <strong>Суббота</strong>
          <Stack>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
            <div className="class"></div>
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

export default TimetablePage;
