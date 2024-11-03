import React from "react";
import "./ProfilePage.scss";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { Button } from "@mui/material";
import { userTypeEnum } from "../../shared/types/userTypeEnum";
import AdminProfile from "./AdminProfile/AdminProfile";
import { userActions } from "../../shared/stores/userSlice";
import { useNavigate } from "react-router-dom";
import StudentProfile from "./StudentProfile/StudentProfile";
import TeacherProfile from "./TeacherProfile/TeacherProfile";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [user, type] = useAppSelector((state) => [
    state.user.currentUser,
    state.user.userType,
  ]) as any;

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
  );
};

export default ProfilePage;
