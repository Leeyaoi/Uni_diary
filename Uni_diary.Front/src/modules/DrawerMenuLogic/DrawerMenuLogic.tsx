import React from "react";
import { useAppSelector } from "../../shared/stores/store";
import { userTypeEnum } from "../../shared/types/userTypeEnum";
import AdminDrawerMenu from "./AdminDrawerMenu";

const DrawerMenuLogic = () => {
  const userType = useAppSelector((state) => state.user.userType);
  switch (userType) {
    case userTypeEnum.admin:
      return <AdminDrawerMenu />;
    case userTypeEnum.student:
      return <></>;
    case userTypeEnum.teacher:
      return <></>;
    default:
      return <></>;
  }
};

export default DrawerMenuLogic;
