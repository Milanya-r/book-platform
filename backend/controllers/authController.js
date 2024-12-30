const pool = require("../utils/database");

// Регистрация пользователя
exports.registerUser = async (req, res) => {
    const { email, password, name, country } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO users (email, password, name, country) VALUES ($1, $2, $3, $4) RETURNING *",
            [email, password, name, country]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка регистрации пользователя:", error);
        res.status(500).json({ error: "Ошибка регистрации пользователя" });
    }
};

// Вход пользователя
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1 AND password = $2",
            [email, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Неверный email или пароль" });
        }

        res.status(200).json({ message: "Вход выполнен", user: result.rows[0] });
    } catch (error) {
        console.error("Ошибка входа пользователя:", error);
        res.status(500).json({ error: "Ошибка входа пользователя" });
    }
};

// Выход пользователя
exports.logoutUser = (req, res) => {
    res.status(200).json({ message: "Выход выполнен" });
};
