import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import storageService from "../services/storage";

const slice = createSlice({
  name: "user",
  initialState: storageService.loadUser(),
  reducers: {
    initializeUser(state, action) {
      return state;
    },
    setUser(_, action) {
      return action.payload;
    },
    clearUser(_, action) {
      return null;
    },
  },
});

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    dispatch(setUser(user));
    await storageService.saveUser(user);
    blogService.setToken(user.token);
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(clearUser());
    await storageService.removeUser();
  };
};

export const setUserFromLocalStorage = () => {
  return async (dispatch) => {
    const user = await storageService.loadUser();
    dispatch(setUser(user));
    blogService.setToken(user.token);
  };
};

export const { setUser, clearUser } = slice.actions;
export default slice.reducer;
