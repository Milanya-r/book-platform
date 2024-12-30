const express = require("express");
const {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
} = require("../controllers/bookController");
const { authMiddleware } = require("../middleware/authMiddleware"); // Твой middleware для авторизации
const { validateCreateBook, validateUpdateBook } = require("../middleware/bookValidationMiddleware"); // Валидация данных книги

const router = express.Router();

// Регистрируем маршрут для создания книги с валидацией данных
router.post("/", authMiddleware, validateCreateBook, createBook);

// Регистрируем маршрут для получения всех книг
router.get("/", getBooks);

// Регистрируем маршрут для получения книги по id
router.get("/:bookId", getBookById);

// Регистрируем маршрут для обновления книги с валидацией данных
router.patch("/:bookId", authMiddleware, validateUpdateBook, updateBook);

// Регистрируем маршрут для удаления книги
router.delete("/:bookId", authMiddleware, deleteBook);

module.exports = router;
