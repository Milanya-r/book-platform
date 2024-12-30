const express = require("express");
const { deleteBook } = require("../controllers/adminController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Логирование для отладки
console.log("deleteBook:", deleteBook);
console.log("authMiddleware:", authMiddleware);

// Удаление книги
router.delete("/:bookId", authMiddleware, deleteBook);

module.exports = router;
