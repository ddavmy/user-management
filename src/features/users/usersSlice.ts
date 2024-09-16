import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  filteredUsers: User[];
  loading: "pending" | "fulfilled" | "rejected";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
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
  reducers: {
    filterUsers: (state, action: PayloadAction<Partial<User>>) => {
      const { name, username, email, phone } = action.payload;
      state.filteredUsers = state.users.filter((user) => {
        return (
          (!name || user.name.toLowerCase().includes(name.toLowerCase())) &&
          (!username ||
            user.username.toLowerCase().includes(username.toLowerCase())) &&
          (!email || user.email.toLowerCase().includes(email.toLowerCase())) &&
          (!phone || user.phone.includes(phone))
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.users = action.payload;
      state.filteredUsers = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.error.message || "Error, rejected";
    });
  },
});

export const { filterUsers } = usersSlice.actions;
export default usersSlice.reducer;
