import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserType from "../types/user";
import { RESTMethod } from "../types/RESTMethodEnum";
import { HttpRequest } from "../../api/GenericApi";
import AdminType from "../types/admin";
import TeacherType from "../types/teacher";
import StudentType from "../types/student";
import { userTypeEnum } from "../types/userTypeEnum";
import Cookies from "universal-cookie";

const userLogin = createAsyncThunk<
  UserType | null,
  { login: string; password: string }
>("users/auth", async (data) => {
  try {
    const response = await HttpRequest<UserType>({
      uri: "/user/auth",
      method: RESTMethod.Post,
      item: data,
    });
    if (response.code === "error") {
      return null;
    }
    return response.data;
  } catch (error) {
    return null;
  }
});

const userLoginByToken = createAsyncThunk("users/login", async (data) => {
  try {
    const response = await HttpRequest<UserType>({
      uri: "/user/login",
      method: RESTMethod.Get,
    });
    if (response.code === "error") {
      return null;
    }
    return response.data;
  } catch (error) {
    return null;
  }
});

const refreshToken = createAsyncThunk("users/refreshToken", async (data) => {
  try {
    const response = await HttpRequest<UserType>({
      uri: "/user/refreshToken",
      method: RESTMethod.Get,
    });
    if (response.code === "error") {
      return null;
    }
    return response.data;
  } catch (error) {
    return null;
  }
});

interface UserState {
  currentUser: AdminType | TeacherType | StudentType | null;
  error: string | null;
  loading: boolean;
  userType: userTypeEnum | null;
  loggedIn: boolean;
}

const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
  userType: null,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      const cookies = new Cookies();
      if (action.payload == null) {
        state.currentUser = null;
        state.userType = null;
        cookies.set("accessToken", null, { path: "/" });
        cookies.set("refreshToken", null, { path: "/" });
        return;
      }

      const { admin, teacher, student, accessToken, refreshToken } =
        action.payload;
      state.loggedIn = true;

      if (accessToken && refreshToken) {
        cookies.set("accessToken", accessToken, { path: "/" });
        cookies.set("refreshToken", refreshToken, { path: "/" });
      }

      if (admin) {
        state.currentUser = admin;
        state.userType = userTypeEnum.admin;
      } else if (teacher) {
        state.currentUser = teacher;
        state.userType = userTypeEnum.teacher;
      } else if (student) {
        state.currentUser = student;
        state.userType = userTypeEnum.student;
      } else {
        state.currentUser = null;
        state.userType = null;
        state.loggedIn = false;
      }
    },
    clearUser: (state) => {
      const cookies = new Cookies();
      state.userType = null;
      state.currentUser = null;
      state.error = null;
      state.loggedIn = false;
      cookies.set("accessToken", null, { path: "/" });
      cookies.set("refreshToken", null, { path: "/" });
    },
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        userSlice.caseReducers.setUser(state, action);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //loginByToken
      .addCase(userLoginByToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLoginByToken.fulfilled, (state, action) => {
        state.loading = false;
        userSlice.caseReducers.setUser(state, action);
      })
      .addCase(userLoginByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //refreshToken
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        new Cookies().set("accessToken", action.payload?.accessToken, {
          path: "/",
        });
        new Cookies().set("refreshToken", action.payload?.refreshToken, {
          path: "/",
        });
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
export const userActions = {
  ...userSlice.actions,
  userLogin,
  userLoginByToken,
  refreshToken,
};
