import { Todo } from "../models/todo.models.js";
import { User } from "../models/user.models.js";


export const createTodo = async (req, res) => {
    try {
        const id = req.user.id;
        const { title, description } = req.body;
        const newTodo = new Todo({ title, description });
        const saveTodo = await newTodo.save();
        await User.findByIdAndUpdate(id, { $push: { todo: saveTodo._id } });
        res.status(200).json({ message: "Task cretaed successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


export const getTodo = async (req, res) => {
    try {
        const id = req.user.id;
        const userTodo = await User.findById(id).populate({
            path: "todo",
            options: { sort: { createdAt: -1 } }
        });
        res.status(200).json({ data: userTodo });
    } catch (error) {
        res.status(404).json({ message: "Internal Server Error" });
    }
};


export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id; // Get todo ID from URL parameter
        const userId = req.user.id; // Get the authenticated user ID
        if (!todoId) {
            return res.status(400).json({ message: "Todo ID is required" });
        }
        // Check if the todo exists and belongs to the user
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        // Delete the todo document
        await Todo.findByIdAndDelete(todoId);

        // Remove the todo reference from the user's todo array
        await User.findByIdAndUpdate(userId, { $pull: { todo: todoId } });

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log("Error deleting todo:", error);
    }
};


export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        await Todo.findByIdAndUpdate(id, { title, description });
        res.status(200).json({ message: "Todo Updated Successfully" });
    } catch (error) {
        res.status(401).json({ message: "Error updating todo", error: error.message });
    }
};



export const updateImpTodo = async (req, res)=> {
    try {
        const { id } = req.params;
        const todoData = await Todo.findById(id);
        const impTodo = todoData.important;
        await Todo.findByIdAndUpdate(id, {important : !impTodo});
        res.status(200).json({ message: "marked as important Successfully" });
    } catch (error) {
        res.status(401).json({ message: "error mark as important todo status", error });
    }
}

export const updateCompletedTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todoData = await Todo.findById(id);
        if (!todoData) {
            return res.status(404).json({ message: "Todo not found" });
        }
        const completedTodo = todoData.completed;
        await Todo.findByIdAndUpdate(id, { completed: !completedTodo });
        res.status(200).json({ message: "Task Updated Successfully" });
    } catch (error) {
        res.status(500).json({ message: "error marked as completed todo status", error: error.message });
    }
};


export const getImportantTodo = async (req, res) => {
    try {
        const id = req.user.id;
        const data = await User.findById(id).populate({
            path: "todo",
            match: {important: true},
            options: { sort: { createdAt: -1 } }
        });
        const importantTodo = data.todo;
        res.status(200).json({ data: importantTodo });
    } catch (error) {
        res.status(404).json({ message: "Internal Server Error" });
    }
};


export const getCompletedTodo = async (req, res) => {
    try {
        const id = req.user.id;
        const data = await User.findById(id).populate({
            path: "todo",
            match: { completed: true },
            options: { sort: { createdAt: -1 } }
        });
        const completedTodo = data.todo;
        res.status(200).json({ data: completedTodo });
    } catch (error) {
        res.status(404).json({ message: "Internal Server Error" });
    }
};


export const getIncompletedTodo = async (req, res) => {
    try {
        const id = req.user.id;
        const data = await User.findById(id).populate({
            path: "todo",
            match: { completed: false },
            options: { sort: { createdAt: -1 } }
        });
        const incompletedTodo = data.todo;
        res.status(200).json({ data: incompletedTodo });
    } catch (error) {
        res.status(404).json({ message: "Internal Server Error" });
    }
};