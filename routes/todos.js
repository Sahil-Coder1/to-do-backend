const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Todo = require("../models/Todo");
const { check, validationResult } = require("express-validator");

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.find({ user: id });

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description must be a string")
        .optional()
        .isString(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, userId } = req.body;

    try {
      const newTodo = new Todo({
        title,
        description: description || "",
        user: req.user.id,
        completed: false,
        user: userId,
      });

      const todo = await newTodo.save();
      res.status(201).json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  const { completed } = req.body;

  if (typeof completed !== "boolean")
    return res.status(400).json({ msg: "Completed must be a boolean" });

  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    todo.completed = completed;
    todo.updatedAt = Date.now();
    await todo.save();

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.put("/update/:id", auth, async (req, res) => {
  const { title, description } = req.body;

  if (!title?.trim() && !description?.trim()) {
    return res.status(400).json({ msg: "Nothing to update" });
  }

  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    if (title?.trim()) todo.title = title.trim();
    if (description?.trim()) todo.description = description.trim();
    todo.updatedAt = Date.now();

    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await todo.deleteOne();
    res.json({ msg: "Todo removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
