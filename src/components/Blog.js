import { useState } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, user, handleRemove, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [detailsVisible, setDetailsVisible] = useState(false);
  const showWhenVisible = { display: detailsVisible ? "" : "none" };

  const buttonLabel = detailsVisible ? "hide" : "view";

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleLikeClick = () => {
    handleLike(blog);
  };

  const handleRemoveClick = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemove(blog);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  );
};

export default Blog;
