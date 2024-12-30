const pool = require("../utils/database");

// Функция для создания нового пользователя
async function createUser(name, email, password, role = "reader", isActive = true, country = "") {
    const createdAt = new Date();
    const result = await pool.query(
        "INSERT INTO users (name, email, password, role, is_active, country, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [name, email, password, role, isActive, country, createdAt]
    );
    return result.rows[0];
}

// Функция для получения пользователя по email
async function getUserByEmail(email) {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return result.rows[0];
}

// Функция для обновления статуса пользователя
async function updateUserStatus(userId, isActive) {
    const result = await pool.query(
        "UPDATE users SET is_active = $1 WHERE id = $2 RETURNING *",
        [isActive, userId]
    );
    return result.rows[0];
}

// Экспорт функций
module.exports = {
    createUser,
    getUserByEmail,
    updateUserStatus,
};
