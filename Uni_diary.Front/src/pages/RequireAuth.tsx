import React, { ReactNode } from "react";
import Cookies from "universal-cookie";
import * as jwt from "jsonwebtoken";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../shared/stores/store";
import { userActions } from "../shared/stores/userSlice";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const cookies = new Cookies();
  const token = cookies.get("accessToken");
  if (!token) {
    return <Navigate to="/login" />;
  }
  const { exp } = jwt.decode(token) as jwt.JwtPayload;
  if (exp == undefined || Date.now() >= exp * 1000) {
    dispatch(userActions.refreshToken());
  }
  return children;
};

export default RequireAuth;
