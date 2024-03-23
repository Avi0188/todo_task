const express = require("express");
const todoModel = require("../models/todo.model");
const auth = require("../middleware/auth.middleware")
const todoRouter = express.Router();

// Create a new todo
todoRouter.post("/" ,auth, async (req, res) => {
    try {
        const newTodo = await todoModel.create(req.body);
        return res.status(201).json(newTodo);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Get all todos
todoRouter.get("/",auth,async (req, res) => {
    try {
        const todos = await todoModel.find();
        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get a todo by ID
todoRouter.get("/:id", auth, async (req, res) => {
    try {
        const todo = await todoModel.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found", id: req.params.id });
        }
        return res.status(200).json({ todo, id: req.params.id });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Update a todo by ID
todoRouter.put("/:id",auth, async (req, res) => {
    try {
        const updatedTodo = await todoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json(updatedTodo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Delete a todo by ID
todoRouter.delete("/:id",auth, async (req, res) => {
    try {
        const deletedTodo = await todoModel.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = todoRouter;
