const User = ({ blogUser }) => {
  if (!blogUser) {
    return null;
  }

  return (
    <div>
      <h2>{blogUser.name}</h2>
      <h3>added blogs</h3>
      {blogUser.blogs.map((blog) => {
        return <div key={blog.id}>{blog.title}</div>;
      })}
    </div>
  );
};

export default User;
