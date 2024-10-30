import React from "react";
import "./TeacherProfile.scss";
import { useAppSelector } from "../../shared/stores/store";
import TeacherType from "../../shared/types/teacher";

const TeacherProfile = () => {
  const user = useAppSelector((state) => state.user.currentUser) as TeacherType;
  return (
    <div id="profile_data">
      <p>Имя: {user?.name}</p>
      <p>Фамилия: {user?.surname}</p>
      <p>Должность: {user?.jobTitle}</p>
    </div>
  );
};

export default TeacherProfile;
