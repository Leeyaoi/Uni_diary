import {
  Autocomplete,
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
import GroupCourseDataGrid from "./GroupCourseDataGrid/GroupCourseDataGrid";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { CourseActions } from "../../shared/stores/courseSlice";
import CreateCourseDialog from "./CourseDialogs/CreateCourseDialog";
import EditCourseDialog from "./CourseDialogs/EditCourseDialog";
import DeleteCourseDialog from "./CourseDialogs/DeleteCourseDialog";
import { TeacherCourseActions } from "../../shared/stores/teacherCourseSlice";
import CreateTeacherCourseDialog from "./TeacherCourseDialogs/CreateTeacherCourseDialog";
import EditTeacherCourseDialog from "./TeacherCourseDialogs/EditTeacherCourseDialog";
import DeleteTeacherCourseDialog from "./TeacherCourseDialogs/DeleteTeacherCourseDialog";
import { GroupCourseActions } from "../../shared/stores/groupCourseSlice";
import CreateGroupCourseDialog from "./GroupCourseDialogs/CreateGroupCourseDialog";
import EditGroupCourseDialog from "./GroupCourseDialogs/EditGroupCourseDialog";
import DeleteGroupCourseDialog from "./GroupCourseDialogs/DeleteGroupCourseDialog";

const CoursePage = () => {
  const dispatch = useAppDispatch();

  const [course, setCourse] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [TeacherLimit, setTeacherLimit] = useState(5);
  const [TeacherPage, setTeacherPage] = useState(1);
  const [GroupLimit, setGroupLimit] = useState(5);
  const [GroupPage, setGroupPage] = useState(1);

  const [teacherId, setTeacherId] = useState("");
  const [groupId, setGroupId] = useState("");

  const [openTeacherCreate, setOpenTeacherCreate] = useState(false);
  const [openTeacherDelete, setOpenTeacherDelete] = useState(false);
  const [openTeacherEdit, setOpenTeacherEdit] = useState(false);

  const [openGroupCreate, setOpenGroupCreate] = useState(false);
  const [openGroupDelete, setOpenGroupDelete] = useState(false);
  const [openGroupEdit, setOpenGroupEdit] = useState(false);

  const [openCourseCreate, setOpenCourseCreate] = useState(false);
  const [openCourseDelete, setOpenCourseDelete] = useState(false);
  const [openCourseEdit, setOpenCourseEdit] = useState(false);

  const courses = useAppSelector((state) => state.course.courses);
  const teacherCourses = useAppSelector(
    (state) => state.teacherCourse.TeacherCourses
  );
  const groupCourses = useAppSelector(
    (state) => state.groupCourse.GroupCourses
  );

  const handleOpenTeacherCreate = () => {
    setOpenTeacherCreate(true);
  };

  const handleOpenTeacherDelete = (id: string) => {
    setOpenTeacherDelete(true);
    setTeacherId(id);
  };

  const handleOpenTeacherEdit = (id: string) => {
    setOpenTeacherEdit(true);
    setTeacherId(id);
  };

  const handleOpenGroupCreate = () => {
    setOpenGroupCreate(true);
  };

  const handleOpenGroupDelete = (id: string) => {
    setOpenGroupDelete(true);
    setGroupId(id);
  };

  const handleOpenGroupEdit = (id: string) => {
    setOpenGroupEdit(true);
    setGroupId(id);
  };

  const handleClose = () => {
    setOpenTeacherCreate(false);
    setOpenTeacherDelete(false);
    setOpenTeacherEdit(false);
    setOpenGroupCreate(false);
    setOpenGroupDelete(false);
    setOpenGroupEdit(false);
    setOpenCourseCreate(false);
    setOpenCourseDelete(false);
    setOpenCourseEdit(false);
  };

  const handleTeacherLimitChange = (event: SelectChangeEvent) => {
    setTeacherLimit(event.target.value as unknown as number);
    setTeacherPage(1);
  };

  const handleGroupLimitChange = (event: SelectChangeEvent) => {
    setGroupLimit(event.target.value as unknown as number);
    setGroupPage(1);
  };

  const setSearch = (newValue: string) => {
    setCourse(null);
    setQuery(newValue);
  };

  const getOptionsDelayed = useCallback(
    debounce(async (newValue: string) => {
      dispatch(CourseActions.fetchCourses(newValue));
    }, 400),
    []
  );

  useEffect(() => {
    dispatch(
      TeacherCourseActions.fetchTeacherCourses({
        limit: TeacherLimit,
        page: TeacherPage,
        courseId: course ?? "",
      })
    );
  }, [
    TeacherPage,
    openTeacherCreate,
    openTeacherEdit,
    openTeacherDelete,
    course,
  ]);

  useEffect(() => {
    dispatch(
      GroupCourseActions.fetchGroupCourses({
        limit: GroupLimit,
        page: GroupPage,
        courseId: course ?? "",
      })
    );
  }, [GroupPage, openGroupCreate, openGroupDelete, openGroupEdit, course]);

  return (
    <div id="course">
      <Autocomplete
        options={courses.length ? courses.map((option) => option.name) : []}
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
        <Button variant="contained" onClick={() => setOpenCourseCreate(true)}>
          <AddIcon />
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={course == null}
          onClick={() => setOpenCourseEdit(true)}
        >
          <EditIcon />
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={course == null}
          onClick={() => setOpenCourseDelete(true)}
        >
          <DeleteIcon />
        </Button>
      </div>

      <CreateCourseDialog open={openCourseCreate} handleClose={handleClose} />
      <EditCourseDialog
        open={openCourseEdit}
        handleClose={handleClose}
        id={course ?? ""}
        setSearch={setSearch}
      />
      <DeleteCourseDialog
        open={openCourseDelete}
        handleClose={handleClose}
        id={course ?? ""}
        setSearch={setSearch}
      />

      <Button
        variant="contained"
        onClick={handleOpenTeacherCreate}
        disabled={course == null}
      >
        Назначить преподавателя на предмет
      </Button>
      <TeacherCourseDataGrid
        teachers={teacherCourses}
        limit={TeacherLimit}
        handleLimitChange={handleTeacherLimitChange}
        page={TeacherPage}
        setPage={setTeacherPage}
        handleEdit={handleOpenTeacherEdit}
        handleDelete={handleOpenTeacherDelete}
      />

      <CreateTeacherCourseDialog
        open={openTeacherCreate}
        handleClose={handleClose}
        courseId={course ?? ""}
      />
      <EditTeacherCourseDialog
        open={openTeacherEdit}
        handleClose={handleClose}
        courseId={course ?? ""}
        id={teacherId}
      />
      <DeleteTeacherCourseDialog
        open={openTeacherDelete}
        handleClose={handleClose}
        id={teacherId}
      />

      <Button
        variant="contained"
        disabled={course == null}
        onClick={handleOpenGroupCreate}
      >
        Назначить группе предмет
      </Button>
      <GroupCourseDataGrid
        groups={groupCourses}
        limit={GroupLimit}
        handleLimitChange={handleGroupLimitChange}
        page={GroupPage}
        setPage={setGroupPage}
        handleEdit={handleOpenGroupEdit}
        handleDelete={handleOpenGroupDelete}
      />

      <CreateGroupCourseDialog
        open={openGroupCreate}
        handleClose={handleClose}
        courseId={course ?? ""}
      />
      <EditGroupCourseDialog
        open={openGroupEdit}
        handleClose={handleClose}
        courseId={course ?? ""}
        id={groupId}
      />
      <DeleteGroupCourseDialog
        open={openGroupDelete}
        handleClose={handleClose}
        id={groupId}
      />
    </div>
  );
};

export default CoursePage;
