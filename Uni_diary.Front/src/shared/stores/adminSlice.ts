import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import AdminType from "../types/admin";
import PaginatedType from "../types/paginatedModel";

const deleteAdmin = createAsyncThunk("admin/delete", async (id: string) => {
  try {
    const response = await HttpRequest<AdminType>({
      uri: `/admin/${id}`,
      method: RESTMethod.Delete,
    });
    if (response.code === "error") {
      return {} as AdminType;
    }
    return response.data;
  } catch (error) {
    return {} as AdminType;
  }
});

const getAdminById = createAsyncThunk("admin/fetchOne", async (id: string) => {
  try {
    const response = await HttpRequest<AdminType>({
      uri: `/admin/${id}`,
      method: RESTMethod.Get,
    });
    if (response.code === "error") {
      return {} as AdminType;
    }
    return response.data;
  } catch (error) {
    return {} as AdminType;
  }
});

const fetchAdmins = createAsyncThunk(
  "admin/fetch",
  async ({ limit, page }: { limit: number; page: number }) => {
    try {
      const response = await HttpRequest<PaginatedType<AdminType>>({
        uri: `/admin/paginate`,
        method: RESTMethod.Post,
        item: { limit: limit, page: page },
      });
      if (response.code === "error") {
        return {} as PaginatedType<AdminType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<AdminType>;
    }
  }
);

const updateAdmin = createAsyncThunk(
  "admin/update",
  async (newAdmin: {
    name: string;
    surname: string;
    id: string;
    user: { id: string; login: string; password: string };
  }) => {
    try {
      const userResponse = await HttpRequest<AdminType>({
        uri: `/user/${newAdmin.user.id}`,
        method: RESTMethod.Put,
        item: newAdmin.user,
      });
      if (userResponse.code === "error") {
        return {} as AdminType;
      }
      const response = await HttpRequest<AdminType>({
        uri: `/admin/${newAdmin.id}`,
        method: RESTMethod.Put,
        item: newAdmin,
      });
      if (response.code === "error") {
        return {} as AdminType;
      }
      return response.data;
    } catch (error) {
      return {} as AdminType;
    }
  }
);

const createAdmin = createAsyncThunk(
  "admin/create",
  async (newAdmin: {
    name: string;
    surname: string;
    login: string;
    password: string;
  }) => {
    try {
      const userResponse = await HttpRequest<{ id: string }>({
        uri: `/user/post`,
        method: RESTMethod.Post,
        item: newAdmin,
      });
      if (userResponse.code === "error") {
        return {} as PaginatedType<AdminType>;
      }
      const response = await HttpRequest<AdminType>({
        uri: `/admin/post`,
        method: RESTMethod.Post,
        item: { ...newAdmin, userId: userResponse.data.id },
      });
      if (response.code === "error") {
        return {} as PaginatedType<AdminType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<AdminType>;
    }
  }
);

interface AdminState {
  error: string | null;
  loading: boolean;
  Admins: PaginatedType<AdminType>;
  fetchedAdmin: AdminType;
}

const initialState: AdminState = {
  error: null,
  loading: false,
  Admins: {} as PaginatedType<AdminType>,
  fetchedAdmin: {} as AdminType,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchAdmins
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.Admins = action.payload;
        state.error = null;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //deleteAdmin
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //getAdminById
      .addCase(getAdminById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminById.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedAdmin = action.payload;
        state.error = null;
      })
      .addCase(getAdminById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //updateAdmin
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //createAdmin
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminSlice.reducer;
export const AdminActions = {
  ...adminSlice.actions,
  fetchAdmins,
  deleteAdmin,
  getAdminById,
  updateAdmin,
  createAdmin,
};
