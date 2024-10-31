import React from "react";
import "./ProfilePage.scss";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { Button, Container } from "@mui/material";
import Header from "../../modules/Header/Header";
import Footer from "../../modules/Footer/Footer";
import { userTypeEnum } from "../../shared/types/userTypeEnum";
import AdminProfile from "../../modules/AdminProfile/AdminProfile";
import { userActions } from "../../shared/stores/userSlice";
import { useNavigate } from "react-router-dom";
import StudentProfile from "../../modules/StudentProfile/StudentProfile";
import TeacherProfile from "../../modules/TeacherProfile/TeacherProfile";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.currentUser) as any;
  const type = useAppSelector((state) => state.user.userType);

  const renderProfile = () => {
    switch (type) {
      case userTypeEnum.admin: {
        return <AdminProfile />;
      }
      case userTypeEnum.student: {
        return <StudentProfile />;
      }
      case userTypeEnum.teacher: {
        return <TeacherProfile />;
      }
    }
  };

  return (
    <Container className="container">
      <Header />
      <div id="content">
        <div id="profile">
          {renderProfile()}
          <Button
            variant="contained"
            id="logout_button"
            onClick={() => {
              dispatch(userActions.clearUser());
              navigate("/login");
            }}
          >
            Выйти
          </Button>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default ProfilePage;
