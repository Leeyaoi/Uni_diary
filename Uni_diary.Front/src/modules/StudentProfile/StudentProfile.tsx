import React, { useEffect } from "react";
import "./StudentProfile.scss";
import StudentType from "../../shared/types/student";
import { useAppSelector } from "../../shared/stores/store";

const StudentProfile = () => {
  const user = useAppSelector((state) => state.user.currentUser) as StudentType;

  return (
    <div id="profile_data">
      <p>
        Группа: {user.group.profession.name}-{user.group.year % 100}
        {user.group.num}
      </p>
      <p>Имя: {user?.name}</p>
      <p>Фамилия: {user?.surname}</p>
      <p>Бюджет: {user?.budget ? "да" : "нет"}</p>
    </div>
  );
};

export default StudentProfile;
