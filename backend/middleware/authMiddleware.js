const jwt = require("jsonwebtoken"); // Если вы используете JWT

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: "Нет токена для авторизации" });
    }

    try {
        // Проверяем токен, замените "your-secret-key" на ваш секретный ключ
        const decoded = jwt.verify(token.split(" ")[1], "your-secret-key"); 
        req.userId = decoded.userId; // Предполагается, что userId закодирован в токене
        next();
    } catch (error) {
        console.error("Ошибка проверки токена:", error);
        return res.status(401).json({ message: "Неверный токен" });
    }
};

module.exports = { authMiddleware };
