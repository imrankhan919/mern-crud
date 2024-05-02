import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit, remove, removeTodo } from "../features/todos/todoSlice";

const ListItem = ({ todo }) => {
  const { isSuccess } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleDelete = (_id) => {
    dispatch(removeTodo(_id));
    if (isSuccess) {
      dispatch(remove(_id));
    }
  };

  const handleEdit = (todo) => {
    dispatch(edit(todo));
  };

  return (
    <li className={"list-group-item rounded-0"}>
      <h1 className="display-5"> {todo?.title} </h1>
      <h1 className="display-6"> {todo?.description} </h1>
      <span className="float-end">
        <button
          className="btn btn-warning btn-sm mx-1 rounded-0"
          onClick={() => handleEdit(todo)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm mx-1 rounded-0"
          onClick={() => handleDelete(todo._id)}
        >
          Delete
        </button>
      </span>
    </li>
  );
};

export default ListItem;
