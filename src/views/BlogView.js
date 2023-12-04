const BlogView = ({ blog, handleLike }) => {
  if (!blog) {
    return null;
  }

  const handleLikeClick = () => {
    handleLike(blog);
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button onClick={handleLikeClick} id="like-button">
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  );
};

export default BlogView;
