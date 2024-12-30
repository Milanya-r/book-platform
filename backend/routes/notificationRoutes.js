const express = require("express");
const {
    getNotifications,
    markAsRead,
} = require("../controllers/notificationController");
const { authMiddleware } = require("../middleware/authMiddleware"); // Подключение authMiddleware

const router = express.Router();

// Получить уведомления
router.get("/", authMiddleware, getNotifications);

// Обновить статус уведомления
router.patch("/:notificationId", authMiddleware, markAsRead);

module.exports = router;
