import {
  Autocomplete,
  AutocompleteChangeReason,
  Button,
  debounce,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import "./CoursePage.scss";
import React, { useCallback, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TeacherCourseDataGrid from "./TeacherCourseDataGrid/TeacherCourseDataGrid";
import PaginatedType from "../../shared/types/paginatedModel";
import TeacherCourseType from "../../shared/types/teacherCourse";
import GroupCourseDataGrid from "./GroupCourseDataGrid/GroupCourseDataGrid";
import GroupCourseType from "../../shared/types/groupCourse";
import CourseType from "../../shared/types/course";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { CourseActions } from "../../shared/stores/courseSlice";

const CoursePage = () => {
  const dispatch = useAppDispatch();

  const [course, setCourse] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [TeacherLimit, setTeacherLimit] = useState(5);
  const [TeacherPage, setTeacherPage] = useState(1);
  const [id, setId] = useState("");
  const [openTeacherCreate, setOpenTeacherCreate] = useState(false);
  const [openTeacherDelete, setOpenTeacherDelete] = useState(false);
  const [openTeacherEdit, setOpenTeacherEdit] = useState(false);

  const courses = useAppSelector((state) => state.course.courses);

  const handleOpenTeacherCreate = () => {
    setOpenTeacherCreate(true);
  };

  const handleOpenTeacherDelete = (id: string) => {
    setOpenTeacherDelete(true);
    setId(id);
  };

  const handleOpenTeacherEdit = (id: string) => {
    setOpenTeacherEdit(true);
    setId(id);
  };

  const handleClose = () => {
    setOpenTeacherCreate(false);
    setOpenTeacherDelete(false);
    setOpenTeacherEdit(false);
  };

  const handleTeacherLimitChange = (event: SelectChangeEvent) => {
    setTeacherLimit(event.target.value as unknown as number);
    setTeacherPage(1);
  };

  const getOptionsDelayed = useCallback(
    debounce(async (newValue: string) => {
      dispatch(CourseActions.fetchCourses(newValue));
    }, 400),
    []
  );

  return (
    <div id="course">
      <Autocomplete
        options={courses ? courses.map((option) => option.name) : []}
        onChange={(event: any, newValue: null | string) => {
          if (newValue == null) {
            setCourse(null);
          } else {
            let found = courses.find((i) => i.name == newValue);
            setCourse(found ? found.id : null);
          }
        }}
        inputValue={query}
        onInputChange={(event: any, newInputValue) => {
          setQuery(newInputValue);
          getOptionsDelayed(newInputValue);
        }}
        fullWidth
        renderInput={(params) => <TextField {...params} label="Курс" />}
      />

      <div id="course_button_group">
        <Button variant="contained">
          <AddIcon />
        </Button>
        <Button variant="contained" color="success" disabled={course == null}>
          <EditIcon />
        </Button>
        <Button variant="contained" color="error" disabled={course == null}>
          <DeleteIcon />
        </Button>
      </div>

      <Button variant="contained">Add teacher</Button>
      <TeacherCourseDataGrid
        teachers={{} as PaginatedType<TeacherCourseType>}
        limit={TeacherLimit}
        handleLimitChange={handleTeacherLimitChange}
        page={TeacherPage}
        setPage={setTeacherPage}
        handleEdit={handleOpenTeacherEdit}
        handleDelete={handleOpenTeacherDelete}
      />

      {/*<CreateTeacherDialog open={openTeacherCreate} handleClose={handleClose} />
      <EditTeacherDialog
        open={openTeacherEdit}
        handleClose={handleClose}
        id={id}
      />
      <DeleteTeacherDialog
        open={openTeacherDelete}
        handleClose={handleClose}
        id={id}
      />*/}

      <Button variant="contained">Add group</Button>
      <GroupCourseDataGrid
        teachers={{} as PaginatedType<GroupCourseType>}
        limit={TeacherLimit}
        handleLimitChange={handleTeacherLimitChange}
        page={TeacherPage}
        setPage={setTeacherPage}
        handleEdit={handleOpenTeacherEdit}
        handleDelete={handleOpenTeacherDelete}
      />
    </div>
  );
};

export default CoursePage;
