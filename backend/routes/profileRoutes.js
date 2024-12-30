const express = require("express");
const { updateProfile } = require("../controllers/profileController");
const { validateUpdateProfile } = require("../middleware/validationMiddleware");

const router = express.Router();

// Обновление профиля
router.patch("/:userId", validateUpdateProfile, updateProfile);

module.exports = router;
