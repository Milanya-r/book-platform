const pool = require("../utils/database");

// Создание комментария
exports.createComment = async (req, res) => {
    const { content, bookId } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO comments (user_id, book_id, content) VALUES ($1, $2, $3) RETURNING *",
            [req.userId, bookId, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка создания комментария:", error);
        res.status(500).json({ error: "Ошибка создания комментария" });
    }
};

// Удаление комментария
exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM comments WHERE id = $1 AND user_id = $2 RETURNING *",
            [commentId, req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Комментарий не найден или у вас нет доступа" });
        }

        res.status(200).json({ message: "Комментарий удален" });
    } catch (error) {
        console.error("Ошибка удаления комментария:", error);
        res.status(500).json({ error: "Ошибка удаления комментария" });
    }
};
