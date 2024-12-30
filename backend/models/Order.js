const pool = require("../utils/database");

// Функция для создания нового заказа
async function createOrder(userId, authorId, amount, commission, status = "pending") {
    const createdAt = new Date();
    const result = await pool.query(
        "INSERT INTO orders (user_id, author_id, amount, commission, status, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [userId, authorId, amount, commission, status, createdAt]
    );
    return result.rows[0];
}

// Функция для получения всех заказов пользователя
async function getOrdersByUser(userId) {
    const result = await pool.query(
        "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
        [userId]
    );
    return result.rows;
}

// Функция для обновления статуса заказа
async function updateOrderStatus(orderId, status) {
    const result = await pool.query(
        "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
        [status, orderId]
    );
    return result.rows[0];
}

// Экспорт функций
module.exports = {
    createOrder,
    getOrdersByUser,
    updateOrderStatus,
};
