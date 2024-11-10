import {
  Autocomplete,
  Button,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import "./CoursePage.scss";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TeacherCourseDataGrid from "./TeacherCourseDataGrid/TeacherCourseDataGrid";
import PaginatedType from "../../shared/types/paginatedModel";
import TeacherCourseType from "../../shared/types/teacherCourse";
import GroupCourseDataGrid from "./GroupCourseDataGrid/GroupCourseDataGrid";
import GroupCourseType from "../../shared/types/groupCourse";

const CoursePage = () => {
  const [TeacherLimit, setTeacherLimit] = useState(5);
  const [TeacherPage, setTeacherPage] = useState(1);
  const [id, setId] = useState("");
  const [openTeacherCreate, setOpenTeacherCreate] = useState(false);
  const [openTeacherDelete, setOpenTeacherDelete] = useState(false);
  const [openTeacherEdit, setOpenTeacherEdit] = useState(false);

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

  return (
    <div id="course">
      <Autocomplete
        freeSolo
        fullWidth
        options={["1", "2"].map((option) => option)}
        renderInput={(params) => <TextField {...params} label="Курс" />}
      />
      <div id="course_button_group">
        <Button variant="contained">
          <AddIcon />
        </Button>
        <Button variant="contained" color="success">
          <EditIcon />
        </Button>
        <Button variant="contained" color="error">
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
