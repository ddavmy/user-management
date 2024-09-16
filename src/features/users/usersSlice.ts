import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    display: (state, action: PayloadAction<Partial<User>>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutabl1e state based off those changes
    },
  },
});

// Action creators are generated for each case reducer function
export const { display } = usersSlice.actions;

export default usersSlice.reducer;
