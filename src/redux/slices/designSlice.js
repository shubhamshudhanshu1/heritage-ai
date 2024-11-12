// Redux Slice for Design APIs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

// Thunks for API calls
export const createDesign = createAsyncThunk(
  "design/createDesign",
  async (designData, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session || !session.user) {
        throw new Error("User not authenticated");
      }

      const userId = session.user.id;
      const response = await fetch("/api/design/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...designData, userId }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create design");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateDesign = createAsyncThunk(
  "design/updateDesign",
  async ({ designId, updateData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/design/update?designId=${designId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update design");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getDesignById = createAsyncThunk(
  "design/getDesignById",
  async (designId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/design/getById?designId=${designId}`);
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch design");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteDesign = createAsyncThunk(
  "design/deleteDesign",
  async (designId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/design/delete?designId=${designId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete design");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getDesignsByUserId = createAsyncThunk(
  "design/getDesignsByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session || !session.user) {
        throw new Error("User not authenticated");
      }

      const userId = session.user.id;
      const response = await fetch(`/api/design/get?userId=${userId}`);
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch designs");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getRecentDesignsByUserId = createAsyncThunk(
  "design/getRecentDesignsByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session || !session.user) {
        throw new Error("User not authenticated");
      }

      const userId = session.user.id;
      const response = await fetch(
        `/api/design/getRecentByUser?userId=${userId}`
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch recent designs");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getAllRecentDesigns = createAsyncThunk(
  "design/getAllRecentDesigns",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/design/getAllRecent");
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch recent designs");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Redux Slice
const designSlice = createSlice({
  name: "design",
  initialState: {
    designs: [],
    recentDesigns: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDesign.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDesign.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designs.push(action.payload.data);
      })
      .addCase(createDesign.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateDesign.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.designs.findIndex(
          (design) => design._id === action.payload.data._id
        );
        if (index !== -1) {
          state.designs[index] = action.payload.data;
        }
      })
      .addCase(deleteDesign.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designs = state.designs.filter(
          (design) => design._id !== action.meta.arg
        );
      })
      .addCase(getDesignById.fulfilled, (state, action) => {
        state.status = "succeeded";
        const existingIndex = state.designs.findIndex(
          (design) => design._id === action.payload.data._id
        );
        if (existingIndex === -1) {
          state.designs.push(action.payload.data);
        } else {
          state.designs[existingIndex] = action.payload.data;
        }
      })
      .addCase(getDesignsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designs = action.payload.data;
      })
      .addCase(getRecentDesignsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recentDesigns = action.payload.data;
      })
      .addCase(getAllRecentDesigns.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recentDesigns = action.payload.data;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default designSlice.reducer;
