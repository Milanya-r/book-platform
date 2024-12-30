const express = require("express");
const { createComment, deleteComment } = require("../controllers/commentController");
const { validateMessageContent } = require("../middleware/validationMiddleware");

const router = express.Router();

// Создание комментария
router.post("/", validateMessageContent, createComment);

// Удаление комментария
router.delete("/:commentId", deleteComment);

module.exports = router;
