import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs.sort((a, b) => b.likes - a.likes));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (error) {
      console.log("Error removing blog", error);
    }
  };

  const blogForm = () => (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleRemove={removeBlog}
          handleLike={updateBlogLikes}
        />
      ))}
    </div>
  );

  const updateBlogLikes = async (blog) => {
    try {
      const { user, ...blogWithoutUser } = blog;
      const updatedBlog = await blogService.addLike({
        ...blogWithoutUser,
        likes: blog.likes + 1,
      });
      const updatedBlogWithUser = {
        ...updatedBlog,
        user: blog.user,
      };
      setBlogs((prevBlogs) => {
        const updatedBlogs = prevBlogs.map((prevBlog) =>
          prevBlog.id === updatedBlogWithUser.id
            ? updatedBlogWithUser
            : prevBlog
        );
        return updatedBlogs;
      });
    } catch (error) {
      console.log("Error updating likes", error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("wrong username or password", 5));
      setUsername("");
      setPassword("");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      blogFormRef.current.toggleVisibility();
      newBlog.user = user;
      setBlogs([...blogs, newBlog]);
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          5
        )
      );
    } catch (exception) {
      dispatch(setNotification(`creation failed`, 5));
    }
  };

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
          {createBlogForm()}
          {blogForm()}
        </div>
      )}
    </div>
  );
};
export default App;
