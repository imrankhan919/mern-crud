const Todo = require("../models/todoModel");

const getTodos = async (req, res) => {
  // DB QUERY FOR GETTING ALL DOCUMENTS
  const todos = await Todo.find();

  if (!todos) {
    res.json({ msg: "No Todos Found" }).status(404);
  }

  res.json(todos).status(200);
};

const getTodo = async (req, res) => {
  // DB QUERY FOR GETTING SINGLE DOCUMENT BY ID
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.json({ msg: "No Todo Found" }).status(404);
  }

  res.json(todo).status(200);
};

const addTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.json({ msg: "Please Fill All Details" });
  }

  // DB QUERY FOR SAVONG DATA INTO MODEL

  const todo = await Todo.create({ title, description });

  if (!todo) {
    res.json({
      msg: "Cannot Create Todo",
    });
  }

  res.json(todo).status(201);
};

const removeTodo = async (req, res) => {
  // DB QUERY FOR DELETING SINGLE DOCUMENT BY ID
  await Todo.findByIdAndDelete(req.params.id);

  res.json({ msg: "Todo Deleted!" }).status(200);
};

const updateTodo = async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedTodo).status(200);
};

module.exports = { getTodos, getTodo, addTodo, removeTodo, updateTodo };
