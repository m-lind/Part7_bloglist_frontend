import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import storageService from "./services/storage";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog, likeBlog } from "./reducers/blogReducer";
import {
  loginUser,
  logoutUser,
  setUserFromLocalStorage,
} from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch, Link } from "react-router-dom";
import Users from "./views/Users";
import User from "./views/User";
import BlogView from "./views/BlogView";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    const user = storageService.loadUser();
    if (user) {
      dispatch(setUserFromLocalStorage(user));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    );
  };

  const createBlogForm = () => (
    <div>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
    </div>
  );

  const blogForm = () => {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Blog blog={blog} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const updateBlogLikes = async (blog) => {
    try {
      dispatch(likeBlog({ ...blog, user }));
    } catch (error) {
      console.log("Error updating likes", error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(loginUser({ username, password }));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("wrong username or password", 5));
      setUsername("");
      setPassword("");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      dispatch(createBlog({ ...blogObject, user }));
      blogFormRef.current.toggleVisibility();
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          5
        )
      );
    } catch (exception) {
      dispatch(setNotification(`creation failed`, 5));
    }
  };

  const Home = () => {
    return (
      <div>
        {createBlogForm()}
        {blogForm()}
      </div>
    );
  };

  const match = useMatch("/users/:id");
  const blogUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  const style = {
    background: "lightgrey",
  };

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <div style={style}>
            <Link to="/">blogs</Link> <Link to="/users">users</Link> {user.name}{" "}
            logged in{" "}
            <Button
              variant="contained"
              onClick={handleLogout}
              id="logout-button"
            >
              logout
            </Button>
          </div>
          <h2>blog app</h2>
          <Notification />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User blogUser={blogUser} />} />
            <Route
              path="/blogs/:id"
              element={<BlogView blog={blog} handleLike={updateBlogLikes} />}
            />
          </Routes>
        </div>
      )}
    </div>
  );
};
export default App;
