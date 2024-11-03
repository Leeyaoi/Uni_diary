import React from "react";
import { useAppSelector } from "../../../shared/stores/store";
import AdminType from "../../../shared/types/admin";
import "./AdminProfile.scss";

const AdminProfile = () => {
  const user = useAppSelector((state) => state.user.currentUser) as AdminType;
  return (
    <div id="profile_data">
      <p>Имя: {user?.name}</p>
      <p>Фамилия: {user?.surname}</p>
    </div>
  );
};

export default AdminProfile;
