import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveTodo, updateTodo } from "../features/todos/todoSlice";

const Form = () => {
  const { edit } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    edit.isEdit
      ? dispatch(
          updateTodo({
            _id: edit.todo._id,
            title,
            description,
          })
        )
      : dispatch(
          saveTodo({
            title,
            description,
          })
        );

    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    setTitle(edit.todo.title);
    setDescription(edit.todo.description);
  }, [edit]);

  return (
    <form className="my-2" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Enter Title"
        className="form-control rounded-0 my-2"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        className="form-control rounded-0 my-3"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button className="btn btn-success rounded-0 w-100">Save</button>
    </form>
  );
};

export default Form;
