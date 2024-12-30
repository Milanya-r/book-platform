const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { validateRegister, validateLogin } = require("../middleware/validationMiddleware"); // Валидация данных для регистрации и логина

const router = express.Router();

// Регистрируем маршрут для регистрации с валидацией данных
router.post("/register", validateRegister, registerUser);

// Регистрируем маршрут для логина с валидацией данных
router.post("/login", validateLogin, loginUser);

module.exports = router;
