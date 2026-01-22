const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    due_date: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
