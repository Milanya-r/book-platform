const pool = require("../utils/database");

// Создание нового блога
exports.createBlog = async (req, res) => {
    const { title, content } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO blogs (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
            [req.userId, title, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка создания блога:", error);
        res.status(500).json({ error: "Ошибка создания блога" });
    }
};

// Получение всех блогов
exports.getBlogs = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM blogs ORDER BY created_at DESC");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Ошибка получения блогов:", error);
        res.status(500).json({ error: "Ошибка получения блогов" });
    }
};

// Обновление блога
exports.updateBlog = async (req, res) => {
    const { blogId } = req.params;
    const { title, content } = req.body;

    try {
        const result = await pool.query(
            "UPDATE blogs SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
            [title, content, blogId, req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Блог не найден или у вас нет доступа" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка обновления блога:", error);
        res.status(500).json({ error: "Ошибка обновления блога" });
    }
};

// Удаление блога
exports.deleteBlog = async (req, res) => {
    const { blogId } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM blogs WHERE id = $1 AND user_id = $2 RETURNING *",
            [blogId, req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Блог не найден или у вас нет доступа" });
        }

        res.status(200).json({ message: "Блог удален" });
    } catch (error) {
        console.error("Ошибка удаления блога:", error);
        res.status(500).json({ error: "Ошибка удаления блога" });
    }
};
