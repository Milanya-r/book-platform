const express = require("express");
const { searchBooks, searchAuthors } = require("../controllers/searchController");
const { validateSearchBooks, validateSearchAuthors } = require("../middleware/validationMiddleware");

const router = express.Router();

// Роут для поиска книг
router.get("/books", validateSearchBooks, searchBooks);

// Роут для поиска авторов
router.get("/authors", validateSearchAuthors, searchAuthors);

module.exports = router;
