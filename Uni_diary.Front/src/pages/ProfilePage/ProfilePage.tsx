import React from "react";
import { useAppSelector } from "../../shared/stores/store";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  return <div>{JSON.stringify(user)}</div>;
};

export default ProfilePage;
