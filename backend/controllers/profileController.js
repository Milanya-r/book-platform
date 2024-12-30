const pool = require("../utils/database");

// Получение профиля пользователя
exports.getProfile = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, name, email, role, country, created_at FROM users WHERE id = $1",
            [req.userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Профиль не найден" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка получения профиля:", error);
        res.status(500).json({ error: "Ошибка получения профиля" });
    }
};

// Обновление профиля пользователя
exports.updateProfile = async (req, res) => {
    const { name, country } = req.body;

    // Валидация данных
    if (!name || !country) {
        return res.status(400).json({ error: "Имя и страна обязательны для обновления профиля" });
    }

    try {
        const result = await pool.query(
            "UPDATE users SET name = $1, country = $2 WHERE id = $3 RETURNING *",
            [name, country, req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка обновления профиля:", error);
        res.status(500).json({ error: "Ошибка обновления профиля" });
    }
};
