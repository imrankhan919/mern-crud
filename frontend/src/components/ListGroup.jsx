import React, { useEffect } from "react";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "../features/todos/todoSlice";

const ListGroup = () => {
  const { isLoading, isError, allTodos } = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  if (isLoading) {
    return (
      <h1 className="display-1 text-center text-secondary">Loading....</h1>
    );
  }

  if (isError) {
    return (
      <h1 className="display-1 text-center text-danger">
        Something Went Wrong....
      </h1>
    );
  }

  if (allTodos.length === 0) {
    return (
      <h1 className="display-1 text-center text-secondary">No Todos Yet..</h1>
    );
  }

  return (
    <ul className="list-group my-2">
      {allTodos.map((todo) => (
        <ListItem key={todo._id} todo={todo} />
      ))}
    </ul>
  );
};

export default ListGroup;
