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
    like(state, action) {
      const id = action.payload;
      const toLike = state.find((s) => s.id === id);
      const liked = { ...toLike, likes: toLike.likes + 1 };
      return state.map((s) => (s.id === id ? liked : s));
    },
    replaceBlog(state, action) {
      const replaced = action.payload;
      return state.map((s) => (s.id === replaced.id ? replaced : s));
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(sortedBlogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(addBlog(newBlog));
  };
};

export const likeBlog = (object) => {
  const toLike = { ...object, likes: object.likes + 1 };
  return async (dispatch) => {
    const blog = await blogService.addLike(toLike);
    dispatch(replaceBlog(blog));
  };
};

export const removeBlog = (object) => {
  return async (dispatch) => {
    await blogService.remove(object);
    dispatch(deleteBlog(object.id));
  };
};

export const addComment = (object) => {
  const commentedBlog = { ...object, comment: object.comment };
  return async (dispatch) => {
    const blog = await blogService.addComment(commentedBlog);
    dispatch(
      replaceBlog({ ...blog, comments: [...blog.comments, object.comment] })
    );
  };
};

export const { setBlogs, addBlog, replaceBlog, deleteBlog } = slice.actions;
export default slice.reducer;
