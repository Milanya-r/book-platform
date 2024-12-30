const bcrypt = require("bcrypt");
const User = require("../models/User");

// Регистрация пользователя
exports.registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    // Валидация данных
    if (!email || !password || !name || !phone) {
        return res.status(400).json({ error: "Все поля обязательны для регистрации" });
    }

    try {
        // Проверка, существует ли пользователь с таким email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email уже используется" });
        }

        // Хеширование пароля перед сохранением в базе
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание нового пользователя
        const user = new User({ name, email, password: hashedPassword, phone });
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        console.error("Ошибка регистрации пользователя:", error);
        res.status(500).json({ error: "Ошибка регистрации пользователя" });
    }
};

// Логин пользователя
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email и пароль обязательны для входа" });
    }

    try {
        // Поиск пользователя по email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Неверный email или пароль" });
        }

        // Сравнение пароля с хешированным паролем в базе данных
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Неверный email или пароль" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Ошибка входа пользователя:", error);
        res.status(500).json({ error: "Ошибка входа" });
    }
};
