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
              <ListItemButton id="closeDrawer" onClick={toggleDrawer(false)}>
                <CloseIcon />
              </ListItemButton>
            </ListItem>
            <Divider />
            <DrawerMenuLogic setOpen={setOpen} />
          </Drawer>
        </div>
        <Footer />
      </Container>
    </BrowserRouter>
  );
};

export default App;
