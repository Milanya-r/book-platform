const pool = require("../utils/database");

// Функция для создания нового комментария
async function createComment(userId, bookId, content) {
    const createdAt = new Date();
    const result = await pool.query(
        "INSERT INTO comments (user_id, book_id, content, created_at) VALUES ($1, $2, $3, $4) RETURNING *",
        [userId, bookId, content, createdAt]
    );
    return result.rows[0];
}

// Функция для получения всех комментариев к книге
async function getCommentsByBook(bookId) {
    const result = await pool.query(
        "SELECT * FROM comments WHERE book_id = $1 ORDER BY created_at ASC",
        [bookId]
    );
    return result.rows;
}

// Экспорт функций
module.exports = {
    createComment,
    getCommentsByBook,
};
