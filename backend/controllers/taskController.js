const pool = require("../utils/database");

// Получение всех задач
exports.getTasks = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [req.userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Ошибка получения задач:", error);
        res.status(500).json({ error: "Ошибка получения задач" });
    }
};

// Создание задачи
exports.createTask = async (req, res) => {
    const { title, description, dueDate } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO tasks (user_id, title, description, due_date) VALUES ($1, $2, $3, $4) RETURNING *",
            [req.userId, title, description, dueDate]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка создания задачи:", error);
        res.status(500).json({ error: "Ошибка создания задачи" });
    }
};

// Обновление задачи
exports.updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { isCompleted } = req.body;

    try {
        const result = await pool.query(
            "UPDATE tasks SET is_completed = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
            [isCompleted, taskId, req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Задача не найдена или у вас нет доступа" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка обновления задачи:", error);
        res.status(500).json({ error: "Ошибка обновления задачи" });
    }
};

// Удаление задачи
exports.deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
            [taskId, req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Задача не найдена или у вас нет доступа" });
        }

        res.status(200).json({ message: "Задача удалена" });
    } catch (error) {
        console.error("Ошибка удаления задачи:", error);
        res.status(500).json({ error: "Ошибка удаления задачи" });
    }
};
