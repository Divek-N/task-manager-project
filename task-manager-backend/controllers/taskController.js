const Task = require("../models/Task");

// Status order for sorting
const statusOrder = {
  "Pending": 1,
  "In Progress": 2,
  "Completed": 3
};

// Get all tasks, sorted by status and due_date
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    // Custom sort: first by status, then by due_date, then by createdAt
    tasks.sort((a, b) => {
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      const dateA = a.due_date ? new Date(a.due_date) : new Date(0);
      const dateB = b.due_date ? new Date(b.due_date) : new Date(0);
      return dateA - dateB;
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const task = new Task({ title, description, status, priority, due_date });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
