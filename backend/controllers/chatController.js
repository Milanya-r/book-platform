const pool = require("../utils/database");

// Получение всех сообщений
exports.getMessages = async (req, res) => {
    try {
        // Запрос для получения всех сообщений чата
        const result = await pool.query(
            `SELECT messages.id, messages.content, messages.created_at, users.name AS user_name
             FROM messages
             JOIN users ON messages.user_id = users.id
             ORDER BY messages.created_at DESC`
        );

        // Проверяем, есть ли сообщения
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Нет сообщений" });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Ошибка получения сообщений:", error);
        res.status(500).json({ error: "Ошибка получения сообщений" });
    }
};

// Отправка сообщения
exports.postMessage = async (req, res) => {
    const { content } = req.body;

    // Проверка на наличие текста в сообщении
    if (!content || content.trim() === "") {
        return res.status(400).json({ error: "Содержимое сообщения не может быть пустым" });
    }

    try {
        // Вставка нового сообщения в базу данных
        const result = await pool.query(
            "INSERT INTO messages (user_id, content) VALUES ($1, $2) RETURNING *",
            [req.userId, content]
        );
        
        // Ответ с новыми данными о сообщении
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка отправки сообщения:", error);
        res.status(500).json({ error: "Ошибка отправки сообщения" });
    }
};
