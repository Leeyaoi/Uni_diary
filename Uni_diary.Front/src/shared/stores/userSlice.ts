import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserType from "../types/user";
import { RESTMethod } from "../types/RESTMethodEnum";
import { HttpRequest } from "../../api/GenericApi";
import AdminType from "../types/admin";
import TeacherType from "../types/teacher";
import StudentType from "../types/student";
import { userTypeEnum } from "../types/userTypeEnum";

const userLogin = createAsyncThunk<
  UserType | null,
  { login: string; password: string }
>("users/auth", async (data) => {
  try {
    const response = await HttpRequest<UserType[]>({
      uri: "/user/auth",
      method: RESTMethod.Post,
      item: data,
    });
    if (response.code === "error") {
      return null;
    }
    return response.data[0];
  } catch (error) {
    return null;
  }
});

interface UserState {
  currentUser: AdminType | TeacherType | StudentType | null;
  error: string | null;
  loading: boolean;
  userType: userTypeEnum | null;
}

const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
  userType: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      if (action.payload == null) {
        state.currentUser = null;
        state.userType = null;
        return;
      }

      const { admin, teacher, student } = action.payload;

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
      }
    },
    clearUser: (state) => {
      state.userType = null;
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default userSlice.reducer;
export const userActions = { ...userSlice.actions, userLogin };
