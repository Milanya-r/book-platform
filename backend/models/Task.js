const pool = require('../utils/database'); // Подключение к базе данных

// Функция для создания новой задачи
async function createTask(authorId, title, description, dueDate) {
  const createdAt = new Date();
  const isCompleted = false; // Задача не завершена изначально

  const result = await pool.query(
    "INSERT INTO tasks (author_id, title, description, due_date, is_completed, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [authorId, title, description, dueDate, isCompleted, createdAt]
  );

  return result.rows[0];
}

// Функция для получения всех задач
async function getAllTasks() {
  const result = await pool.query("SELECT * FROM tasks ORDER BY created_at DESC");
  return result.rows;
}

// Функция для обновления статуса задачи (завершена/не завершена)
async function updateTaskStatus(taskId, isCompleted) {
  const result = await pool.query(
    "UPDATE tasks SET is_completed = $1 WHERE id = $2 RETURNING *",
    [isCompleted, taskId]
  );

  return result.rows[0];
}

module.exports = {
  createTask,
  getAllTasks,
  updateTaskStatus,
};
