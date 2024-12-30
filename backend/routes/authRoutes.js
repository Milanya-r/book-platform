const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const { validateRegisterUser } = require("../middleware/validationMiddleware");

const router = express.Router();

// Маршрут для регистрации
router.post("/register", validateRegisterUser, registerUser);

// Маршрут для входа
router.post("/login", loginUser);

// Маршрут для выхода
router.post("/logout", logoutUser);

module.exports = router;
