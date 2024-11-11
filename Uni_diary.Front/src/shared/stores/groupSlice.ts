import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import GroupType from "../types/group";
import PaginatedType from "../types/paginatedModel";

const findGroup = createAsyncThunk("group/search", async (query: string) => {
  try {
    const response = await HttpRequest<GroupType[]>({
      uri: `/group/query/${query}`,
      method: RESTMethod.Get,
    });
    if (response.code === "error") {
      return [] as GroupType[];
    }
    return response.data;
  } catch (error) {
    return [] as GroupType[];
  }
});

const deleteGroup = createAsyncThunk("group/delete", async (id: string) => {
  try {
    const response = await HttpRequest<GroupType>({
      uri: `/group/${id}`,
      method: RESTMethod.Delete,
    });
    if (response.code === "error") {
      return {} as GroupType;
    }
    return response.data;
  } catch (error) {
    return {} as GroupType;
  }
});

const getGroupById = createAsyncThunk("group/fetchOne", async (id: string) => {
  try {
    const response = await HttpRequest<GroupType>({
      uri: `/group/${id}`,
      method: RESTMethod.Get,
    });
    if (response.code === "error") {
      return {} as GroupType;
    }
    return response.data;
  } catch (error) {
    return {} as GroupType;
  }
});

const fetchGroups = createAsyncThunk(
  "group/fetch",
  async ({
    limit,
    page,
    professionId,
  }: {
    limit: number;
    page: number;
    professionId: string;
  }) => {
    try {
      const response = await HttpRequest<PaginatedType<GroupType>>({
        uri: `/group/paginate`,
        method: RESTMethod.Post,
        item: { limit: limit, page: page, professionId: professionId },
      });
      if (response.code === "error") {
        return {} as PaginatedType<GroupType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<GroupType>;
    }
  }
);

const updateGroup = createAsyncThunk(
  "group/update",
  async (newGroup: { id: string; year: number; num: number }) => {
    try {
      const response = await HttpRequest<GroupType>({
        uri: `/group/${newGroup.id}`,
        method: RESTMethod.Put,
        item: newGroup,
      });
      if (response.code === "error") {
        return {} as GroupType;
      }
      return response.data;
    } catch (error) {
      return {} as GroupType;
    }
  }
);

const createGroup = createAsyncThunk(
  "group/create",
  async (newGroup: { year: number; num: number; professionId: string }) => {
    try {
      const response = await HttpRequest<GroupType>({
        uri: `/group/post`,
        method: RESTMethod.Post,
        item: newGroup,
      });
      if (response.code === "error") {
        return {} as PaginatedType<GroupType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<GroupType>;
    }
  }
);

interface GroupState {
  error: string | null;
  loading: boolean;
  groups: PaginatedType<GroupType>;
  fetchedGroup: GroupType;
  foundGroups: GroupType[];
}

const initialState: GroupState = {
  error: null,
  loading: false,
  groups: {} as PaginatedType<GroupType>,
  fetchedGroup: {} as GroupType,
  foundGroups: [],
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchGroups
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
        state.error = null;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //deleteGroup
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //getGroupById
      .addCase(getGroupById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedGroup = action.payload;
        state.error = null;
      })
      .addCase(getGroupById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //updateGroup
      .addCase(updateGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //createGroup
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //findGroup
      .addCase(findGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.foundGroups = action.payload;
      })
      .addCase(findGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default groupSlice.reducer;
export const groupActions = {
  ...groupSlice.actions,
  fetchGroups,
  deleteGroup,
  getGroupById,
  updateGroup,
  createGroup,
  findGroup,
};
