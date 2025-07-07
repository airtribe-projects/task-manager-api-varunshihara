const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tasks = [];
let nextId = 1;

// GET /tasks : Retrieve all tasks, with optional filtering and sorting
app.get("/tasks", (req, res) => {
  let result = [...tasks];

  // Filter by completion status
  if (req.query.completed !== undefined) {
    const completed = req.query.completed === "true";
    result = result.filter((t) => t.completed === completed);
  }

  // Sort by creation date
  if (req.query.sort === "createdAt") {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  res.json(result);
});

// GET /tasks/:id : Retrieve a specific task by its ID
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// GET /tasks/priority/:level : Retrieve tasks by priority level
app.get("/tasks/priority/:level", (req, res) => {
  const level = req.params.level.toLowerCase();
  if (!["low", "medium", "high"].includes(level)) {
    return res.status(400).json({ error: "Invalid priority level" });
  }
  const result = tasks.filter((t) => t.priority === level);
  res.json(result);
});

// POST /tasks : Create a new task
app.post("/tasks", (req, res) => {
  const { title, description, completed, priority } = req.body;
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof completed !== "boolean" ||
    !["low", "medium", "high"].includes((priority || "").toLowerCase()) ||
    title.trim() === "" ||
    description.trim() === ""
  ) {
    return res.status(400).json({ error: "Invalid task data" });
  }
  const task = {
    id: nextId++,
    title,
    description,
    completed,
    priority: priority.toLowerCase(),
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id : Update an existing task by its ID
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, description, completed, priority } = req.body;
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof completed !== "boolean" ||
    !["low", "medium", "high"].includes((priority || "").toLowerCase())
  ) {
    return res.status(400).json({ error: "Invalid task data" });
  }
  task.title = title;
  task.description = description;
  task.completed = completed;
  task.priority = priority.toLowerCase();
  res.json(task);
});

// DELETE /tasks/:id : Delete a task by its ID
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  tasks.splice(index, 1);
  res.status(204).json({ error: false, message: "Task deleted successfully" });
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
