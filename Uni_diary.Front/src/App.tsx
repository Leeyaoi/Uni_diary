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
        <Route path="/timetablePdf" element={<TimetablePdf />} />
        <Route path="/teacher/timetablePdf" element={<TeacherTimetablePdf />} />
        <Route path="/attendancePdf" element={<AttendancePdf />} />
        <Route
          path="/profession/attendancePdf/:groupId"
          element={<ProfessionAttendancePdf />}
        />
        <Route path="/cources/marksPdf" element={<MarksPdf />} />
        <Route
          path="*"
          element={
            <Container className="container">
              <Header setOpen={setOpen} open={open} />
              <div id="content">
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/professions" element={<FacultyPage />} />
                  <Route path="/teachers" element={<TeacherPage />} />
                  <Route path="/admins" element={<AdminPage />} />
                  <Route path="/cources" element={<CoursePage />} />
                  <Route path="/timetable" element={<TimetablePage />} />
                  <Route path="/attendance" element={<AttendancePage />} />
                  <Route path="/marks" element={<MarksPage />} />
                  <Route path="/student/marks" element={<StudentsMarkPage />} />
                  <Route
                    path="/teacher/timetable"
                    element={<TeacherTimetablePage />}
                  />
                  <Route
                    path="/profession/:professionId"
                    element={<ProfessionPage />}
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
