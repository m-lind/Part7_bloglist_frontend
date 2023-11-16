import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const slice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(_, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(addBlog(newBlog));
  };
};

export const { setBlogs, addBlog } = slice.actions;
export default slice.reducer;
