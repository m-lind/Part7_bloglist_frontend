import { useState } from "react";
import Button from "@mui/material/Button";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newURL, setnewURL] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL,
    });
    setNewTitle("");
    setNewAuthor("");
    setnewURL("");
  };

  return (
    <form onSubmit={addBlog} data-testid="blog-form">
      <div>
        <div>
          title:
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={(event) => setNewTitle(event.target.value)}
            data-testid="title-input"
            id="title-input"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={(event) => setNewAuthor(event.target.value)}
            data-testid="author-input"
            id="author-input"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newURL}
            name="url"
            onChange={(event) => setnewURL(event.target.value)}
            data-testid="url-input"
            id="url-input"
          />
        </div>
        <div>
          <Button id="create-button" type="submit">
            create
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
