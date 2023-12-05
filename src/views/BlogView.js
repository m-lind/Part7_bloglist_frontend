import CommentForm from "./../components/CommentForm";

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
      <h3>comments</h3>
      <CommentForm blog={blog} />
      {blog.comments.map((comment) => {
        return (
          <ul key={comment}>
            <li>{comment}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default BlogView;
