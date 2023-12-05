import CommentForm from "./../components/CommentForm";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

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
        <Button
          variant="contained"
          size="small"
          onClick={handleLikeClick}
          id="like-button"
        >
          like
        </Button>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <CommentForm blog={blog} />
      <List>
        {blog.comments.map((comment) => (
          <ListItem key={comment}>
            <ListItemText>-{comment}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BlogView;
