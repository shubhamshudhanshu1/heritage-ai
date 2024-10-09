import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  isAuthenticated: false,
  user: null,
  users: [], // Added users array to hold all users
  loading: false, // Loading state
  error: null, // Error state
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    cache: "no-store",
  });
  const data = await response.json();
  if (data.success) {
    return data.data || [];
  } else {
    throw new Error("Failed to fetch users");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true; // Set loading to true when fetching
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when done
        state.users = action.payload; // Store the fetched users
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.error.message; // Store the error message
      });
  },
});

export const { setUser, clearUser, login, logout } = userSlice.actions;

export default userSlice.reducer;
