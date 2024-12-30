const { body, query, validationResult } = require("express-validator");

// Валидация данных при регистрации пользователя
const validateRegisterUser = [
    body("email").isEmail().withMessage("Неверный формат email"),
    body("password").isLength({ min: 6 }).withMessage("Пароль должен содержать минимум 6 символов"),
    body("name").notEmpty().withMessage("Имя не может быть пустым"),
    body("country").notEmpty().withMessage("Страна не может быть пустой"),
];

// Валидация данных при обновлении профиля
const validateUpdateProfile = [
    body("name").notEmpty().withMessage("Имя не может быть пустым"),
    body("country").notEmpty().withMessage("Страна не может быть пустой"),
];

// Валидация содержимого сообщения
const validateMessageContent = [
    body("content")
        .notEmpty()
        .withMessage("Содержимое сообщения не может быть пустым")
        .isLength({ min: 1 })
        .withMessage("Сообщение должно содержать хотя бы 1 символ"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Валидация данных для создания задачи
const validateTaskData = [
    body("title").notEmpty().withMessage("Заголовок задачи не может быть пустым"),
    body("description").notEmpty().withMessage("Описание задачи не может быть пустым"),
    body("dueDate").isDate().withMessage("Дата должна быть в формате YYYY-MM-DD"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Валидация данных при обновлении задачи
const validateUpdateTask = [
    body("isCompleted").isBoolean().withMessage("Статус завершенности должен быть булевым значением"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateRegisterUser,
    validateUpdateProfile,
    validateMessageContent,
    validateTaskData,
    validateUpdateTask,
};
