const pool = require("../utils/database");

// Функция для создания нового уведомления
async function createNotification(userId, type, message) {
    const createdAt = new Date();
    const isRead = false;
    const result = await pool.query(
        "INSERT INTO notifications (user_id, type, message, is_read, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [userId, type, message, isRead, createdAt]
    );
    return result.rows[0];
}

// Функция для получения уведомлений пользователя
async function getNotificationsByUser(userId) {
    const result = await pool.query(
        "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC",
        [userId]
    );
    return result.rows;
}

// Функция для обновления статуса уведомления
async function markNotificationAsRead(notificationId) {
    const result = await pool.query(
        "UPDATE notifications SET is_read = true WHERE id = $1 RETURNING *",
        [notificationId]
    );
    return result.rows[0];
}

// Экспорт функций
module.exports = {
    createNotification,
    getNotificationsByUser,
    markNotificationAsRead,
};
