const pool = require("../utils/database");

// Функция для создания нового достижения
async function createAchievement(userId, type, points = 0) {
    const createdAt = new Date();
    const result = await pool.query(
        "INSERT INTO achievements (user_id, type, points, created_at) VALUES ($1, $2, $3, $4) RETURNING *",
        [userId, type, points, createdAt]
    );
    return result.rows[0];
}

// Функция для получения всех достижений пользователя
async function getAchievementsByUser(userId) {
    const result = await pool.query(
        "SELECT * FROM achievements WHERE user_id = $1",
        [userId]
    );
    return result.rows;
}

// Экспорт функций
module.exports = {
    createAchievement,
    getAchievementsByUser,
};
