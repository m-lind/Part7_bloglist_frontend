import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "./../reducers/blogReducer";
import Button from "@mui/material/Button";

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const createComment = () => {
    dispatch(addComment({ ...blog, comment: comment }));
    setComment("");
  };

  return (
    <form onSubmit={createComment}>
      <div>
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></input>
        <Button variant="contained" size="small" type="submit">
          add comment
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
