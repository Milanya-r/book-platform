const { body, validationResult } = require('express-validator');

const validateCreateBook = [
    body('title').notEmpty().withMessage('Title is required'),
    body('genre').notEmpty().withMessage('Genre is required'),
    body('description').notEmpty().withMessage('Description is required'),
    // Добавь другие поля для валидации, если нужно

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUpdateBook = [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('genre').optional().notEmpty().withMessage('Genre cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    // Добавь другие поля для валидации, если нужно

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateCreateBook, validateUpdateBook };
    