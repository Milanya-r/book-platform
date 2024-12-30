const pool = require("../utils/database");

// Функция для создания нового блога
async function createBlog(authorId, title, content) {
    const createdAt = new Date();
    const result = await pool.query(
        "INSERT INTO blogs (author_id, title, content, created_at) VALUES ($1, $2, $3, $4) RETURNING *",
        [authorId, title, content, createdAt]
    );
    return result.rows[0];
}

// Функция для получения всех блогов
async function getAllBlogs() {
    const result = await pool.query("SELECT * FROM blogs ORDER BY created_at DESC");
    return result.rows;
}

// Функция для получения блога по ID
async function getBlogById(blogId) {
    const result = await pool.query("SELECT * FROM blogs WHERE id = $1", [blogId]);
    return result.rows[0];
}

// Экспорт функций
module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
};
