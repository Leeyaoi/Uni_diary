import React from "react";
import { useAppSelector } from "../../../shared/stores/store";
import { userTypeEnum } from "../../../shared/types/userTypeEnum";
import AdminHeader from "./AdminHeader/AdminHeader";
import "./HeaderLogic.scss";

const HeaderLogic = () => {
  const userType = useAppSelector((state) => state.user.userType);
  switch (userType) {
    case userTypeEnum.admin:
      return <AdminHeader />;
    case userTypeEnum.student:
      return <></>;
    case userTypeEnum.teacher:
      return <></>;
    default:
      return <></>;
  }
};

export default HeaderLogic;
