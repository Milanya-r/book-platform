const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres", // Замените на ваше имя пользователя
    host: "localhost",
    database: "book_platform",
    password: "123", // Замените на ваш пароль
    port: 5432,
});

pool.connect((err) => {
    if (err) {
        console.error("Ошибка подключения к базе данных:", err);
    } else {
        console.log("Подключение к базе данных успешно");
    }
});

module.exports = pool;
