import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import storageService from "./services/storage";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { setNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from "./reducers/blogReducer";
import {
  loginUser,
  logoutUser,
  setUserFromLocalStorage,
} from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";
import Users from "./views/Users";
import User from "./views/User";
import BlogView from "./views/BlogView";

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
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
    </div>
  );

  const deleteBlog = async (blog) => {
    try {
      dispatch(removeBlog(blog));
    } catch (error) {
      console.log("Error removing blog", error);
    }
  };

  const blogForm = () => {
    return (
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleRemove={deleteBlog}
            handleLike={updateBlogLikes}
          />
        ))}
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

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>
            {user.name} logged in
            <button onClick={handleLogout} id="logout-button">
              logout
            </button>
          </p>
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
