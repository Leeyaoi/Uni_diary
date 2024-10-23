import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserType from "../types/user"; // Make sure UserType is properly defined
import { RESTMethod } from "../types/RESTMethodEnum";
import { HttpRequest } from "../../api/GenericApi";

const userLogin = createAsyncThunk<
  UserType[],
  { login: string; password: string }
>("users/auth", async (data, { rejectWithValue }) => {
  try {
    const response = await HttpRequest<UserType[]>({
      uri: "/user/auth",
      method: RESTMethod.Post,
      item: data,
    });
    if (response.code === "error") {
      return rejectWithValue(response.error.message || "Login failed");
    }
    return response.data;
  } catch (error) {
    return rejectWithValue((error as Error).message || "An error occurred");
  }
});

interface UserState {
  currentUser: {} | null;
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType[]>) => {
      const { admin, teacher, student } = action.payload[0];

      if (admin) {
        state.currentUser = admin;
      } else if (teacher) {
        state.currentUser = teacher;
      } else if (student) {
        state.currentUser = student;
      } else {
        state.currentUser = action.payload;
      }
    },
    clearUser: (state) => {
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
