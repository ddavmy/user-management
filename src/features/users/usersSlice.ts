import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  loading: "pending" | "fulfilled" | "rejected";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: "pending",
  error: null,
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/");
  const data = await response.json();
  return data;
});

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = "fulfilled";
        state.users = action.payload;
        state.error = null;
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.users = [];
      state.loading = "rejected";
      state.error = action.error.message || "Error, rejected";
    });
  },
});

export default usersSlice.reducer;
