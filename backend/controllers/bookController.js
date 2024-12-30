const pool = require("../utils/database");

// Функция для создания книги
async function createBook(req, res) {
    const { title, authorId, genre, description } = req.body;

    // Валидация данных
    if (!title || !authorId || !genre || !description) {
        return res.status(400).json({ error: "Все поля обязательны для заполнения" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO books (title, author_id, genre, description) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, authorId, genre, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка создания книги:", error);
        res.status(500).json({ error: "Ошибка создания книги" });
    }
}

// Функция для получения всех книг
async function getBooks(req, res) {
    try {
        const result = await pool.query("SELECT * FROM books ORDER BY created_at DESC");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Ошибка получения книг:", error);
        res.status(500).json({ error: "Ошибка получения книг" });
    }
}

// Функция для получения книги по id
async function getBookById(req, res) {
    const { bookId } = req.params;

    try {
        const result = await pool.query("SELECT * FROM books WHERE id = $1", [bookId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Книга не найдена" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка получения книги по id:", error);
        res.status(500).json({ error: "Ошибка получения книги по id" });
    }
}

// Функция для обновления книги
async function updateBook(req, res) {
    const { bookId } = req.params;
    const { title, authorId, genre, description } = req.body;

    // Валидация данных
    if (!title || !authorId || !genre || !description) {
        return res.status(400).json({ error: "Все поля обязательны для заполнения" });
    }

    try {
        const result = await pool.query(
            "UPDATE books SET title = $1, author_id = $2, genre = $3, description = $4 WHERE id = $5 RETURNING *",
            [title, authorId, genre, description, bookId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Книга не найдена" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка обновления книги:", error);
        res.status(500).json({ error: "Ошибка обновления книги" });
    }
}

// Функция для удаления книги
async function deleteBook(req, res) {
    const { bookId } = req.params;

    try {
        const result = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *", [bookId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Книга не найдена" });
        }

        res.status(200).json({ message: "Книга удалена" });
    } catch (error) {
        console.error("Ошибка удаления книги:", error);
        res.status(500).json({ error: "Ошибка удаления книги" });
    }
}

// Экспортируем все функции
module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
};
