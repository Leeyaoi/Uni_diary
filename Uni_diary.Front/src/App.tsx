import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./index.scss";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfessionPage from "./pages/ProfessionPage/ProfessionPage";
import Header from "./modules/Header/Header";
import { Container, Divider, ListItem, ListItemButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Footer from "./modules/Footer/Footer";
import FacultyPage from "./pages/FacultyPage/FacultyPage";
import TeacherPage from "./pages/TeacherPage/TeacherPage";
import CloseIcon from "@mui/icons-material/Close";
import DrawerMenuLogic from "./modules/DrawerMenuLogic/DrawerMenuLogic";
import { useAppSelector } from "./shared/stores/store";
import AdminPage from "./pages/AdminPage/AdminPage";
import CoursePage from "./pages/CoursePage/CoursePage";
import TimetablePage from "./pages/TimetablePage/TimetablePage";
import TeacherTimetablePage from "./pages/TeacherTimetablePage/TeacherTimetablePage";
import AttendancePage from "./pages/AttendancePage/AttendancePage";
import MarksPage from "./pages/MarksPage/MarksPage";
import TimetablePdf from "./pages/TimetablePage/TimetablePdf/TimetablePdf";
import TeacherTimetablePdf from "./pages/TeacherTimetablePage/TeacherTimetablePdf/TeacherTimetablePdf";
import AttendancePdf from "./pages/AttendancePage/AttendancePdf/AttendancePdf";
import ProfessionAttendancePdf from "./pages/ProfessionPage/ProfessionAttendancePdf/ProfessionAttendancePdf";
import MarksPdf from "./pages/MarksPage/MarksPdf/MarksPdf";
import StudentsMarkPage from "./pages/StudentsMarkPage/StudentsMarkPage";
import StudentsAttendance from "./pages/StudentsAttendance/StudentsAttendance";
import StudentAttendancePdf from "./pages/StudentsAttendance/StudentAttendancePdf/StudentAttendancePdf";
import StudentsMarkPdf from "./pages/StudentsMarkPage/StudentsMarkPdf/StudentsMarkPdf";
import RequireAuth from "./pages/RequireAuth";

const App = () => {
  const [open, setOpen] = React.useState(false);

  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  useEffect(() => {
    if (window.location.pathname == "/profile") {
      setOpen(true);
    }
  }, [window.location]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/timetablePdf"
          element={
            <RequireAuth>
              <TimetablePdf />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher/timetablePdf"
          element={
            <RequireAuth>
              <TeacherTimetablePdf />
            </RequireAuth>
          }
        />
        <Route
          path="/attendancePdf"
          element={
            <RequireAuth>
              <AttendancePdf />
            </RequireAuth>
          }
        />
        <Route
          path="/profession/attendancePdf/:groupId"
          element={
            <RequireAuth>
              <ProfessionAttendancePdf />
            </RequireAuth>
          }
        />
        <Route
          path="/cources/marksPdf"
          element={
            <RequireAuth>
              <MarksPdf />
            </RequireAuth>
          }
        />
        <Route
          path="/student/marksPdf"
          element={
            <RequireAuth>
              <StudentsMarkPdf />
            </RequireAuth>
          }
        />
        <Route
          path="/student/attendancePdf"
          element={
            <RequireAuth>
              <StudentAttendancePdf />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <Container className="container">
              <Header setOpen={setOpen} open={open} />
              <div id="content">
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/profile"
                    element={
                      <RequireAuth>
                        <ProfilePage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/professions"
                    element={
                      <RequireAuth>
                        <FacultyPage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/teachers"
                    element={
                      <RequireAuth>
                        <TeacherPage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/admins"
                    element={
                      <RequireAuth>
                        <AdminPage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/cources"
                    element={
                      <RequireAuth>
                        <CoursePage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/timetable"
                    element={
                      <RequireAuth>
                        <TimetablePage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/attendance"
                    element={
                      <RequireAuth>
                        <AttendancePage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/marks"
                    element={
                      <RequireAuth>
                        <MarksPage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/student/marks"
                    element={
                      <RequireAuth>
                        <StudentsMarkPage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/student/attendance"
                    element={
                      <RequireAuth>
                        <StudentsAttendance />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/teacher/timetable"
                    element={
                      <RequireAuth>
                        <TeacherTimetablePage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/profession/:professionId"
                    element={
                      <RequireAuth>
                        <ProfessionPage />
                      </RequireAuth>
                    }
                  />
                </Routes>
                <Drawer
                  variant="persistent"
                  anchor="left"
                  id="menu"
                  open={loggedIn && open}
                  onClose={toggleDrawer(false)}
                >
                  <ListItem>
                    <ListItemButton
                      id="closeDrawer"
                      onClick={toggleDrawer(false)}
                    >
                      <CloseIcon />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <DrawerMenuLogic setOpen={setOpen} />
                </Drawer>
              </div>
              <Footer />
            </Container>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
