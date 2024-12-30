const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const { validateTaskData, validateUpdateTask } = require("../middleware/validationMiddleware");

const router = express.Router();

// Создать задачу
router.post("/", validateTaskData, createTask);

// Получить все задачи
router.get("/", getTasks);

// Обновить задачу
router.patch("/:taskId", validateUpdateTask, updateTask);

// Удалить задачу
router.delete("/:taskId", deleteTask);

module.exports = router;
