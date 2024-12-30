const pool = require("../utils/database");

// Функция для создания новой книги
async function createBook(title, genre, rating, author, country) {
    const createdAt = new Date();
    const result = await pool.query(
        "INSERT INTO books (title, genre, rating, author, country, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [title, genre, rating, author, country, createdAt]
    );
    return result.rows[0];
}

// Функция для получения всех книг
async function getAllBooks() {
    const result = await pool.query("SELECT * FROM books ORDER BY created_at DESC");
    return result.rows;
}

// Функция для получения книги по ID
async function getBookById(bookId) {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [bookId]);
    return result.rows[0];
}

// Экспорт функций
module.exports = {
    createBook,
    getAllBooks,
    getBookById,
};
