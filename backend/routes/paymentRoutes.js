const express = require("express");
const { createPayment, processCallback } = require("../controllers/paymentController");
const { validatePaymentData } = require("../middleware/validationMiddleware"); // Валидация данных для платежа

const router = express.Router();

// Регистрируем маршрут для создания платежа с валидацией данных
router.post("/create-payment", validatePaymentData, createPayment);

// Регистрируем маршрут для обработки callback уведомлений
router.post("/callback", processCallback);

module.exports = router;
