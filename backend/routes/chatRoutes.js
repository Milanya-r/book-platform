const express = require("express");
const { getMessages, postMessage } = require("../controllers/chatController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { validateMessageContent } = require("../middleware/validationMiddleware"); // Проверь, что путь правильный

const router = express.Router();

// Логируем функцию, чтобы увидеть, что передается
console.log('validateMessageContent:', validateMessageContent);

// Получить все сообщения чата
router.get("/", authMiddleware, getMessages);

// Отправить новое сообщение с валидацией данных
router.post("/", authMiddleware, validateMessageContent, postMessage);

module.exports = router;
