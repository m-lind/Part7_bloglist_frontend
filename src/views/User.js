const User = (props) => {
  if (!props.blogUser) {
    return null;
  }

  return (
    <div>
      <h2>{props.blogUser.name}</h2>
      <h3>added blogs</h3>
      {props.blogUser.blogs.map((blog) => {
        return <div key={blog.id}>{blog.title}</div>;
      })}
    </div>
  );
};

export default User;
