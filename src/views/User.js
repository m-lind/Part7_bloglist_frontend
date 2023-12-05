import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon, CircleIcon } from "@mui/material";

const User = ({ blogUser }) => {
  if (!blogUser) {
    return null;
  }

  return (
    <div>
      <h2>{blogUser.name}</h2>
      <h3>added blogs</h3>
      <List>
        {blogUser.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText>-{blog.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default User;
