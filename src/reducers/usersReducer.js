import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(_, action) {
      return action.payload;
    },
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const { setUsers } = slice.actions;
export default slice.reducer;
