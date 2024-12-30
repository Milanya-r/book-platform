const pool = require("../utils/database");

// Добавление достижения
exports.addAchievement = async (userId, type, points) => {
    try {
        const result = await pool.query(
            "INSERT INTO achievements (user_id, type, points) VALUES ($1, $2, $3) RETURNING *",
            [userId, type, points]
        );
        console.log("Достижение добавлено:", result.rows[0]);
        return result.rows[0]; // Возвращаем добавленное достижение
    } catch (error) {
        console.error("Ошибка добавления достижения:", error);
        throw new Error("Не удалось добавить достижение");
    }
};

// Получение всех достижений пользователя
exports.getAchievements = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM achievements WHERE user_id = $1 ORDER BY created_at DESC",
            [req.userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Достижения не найдены" });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Ошибка получения достижений:", error);
        res.status(500).json({ error: "Ошибка получения достижений" });
    }
};
