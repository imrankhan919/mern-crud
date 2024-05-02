const express = require("express");
const {
  getTodos,
  getTodo,
  addTodo,
  removeTodo,
  updateTodo,
} = require("../controllers/todoController");

const router = express.Router();

// Get All Todos
router.get("/", getTodos);
// Get Single Todo
router.get("/:id", getTodo);
// Create Todo
router.post("/", addTodo);
// Remove Todo
router.delete("/:id", removeTodo);
// Update Todo
router.put("/:id", updateTodo);

module.exports = router;
