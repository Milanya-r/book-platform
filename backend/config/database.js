const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.PG_USER, // Имя пользователя базы данных
    host: process.env.PG_HOST, // Хост базы данных
    database: process.env.PG_DATABASE, // Имя базы данных
    password: process.env.PG_PASSWORD, // Пароль базы данных
    port: process.env.PG_PORT, // Порт PostgreSQL (обычно 5432)
});

pool.connect((err) => {
    if (err) {
        console.error("Ошибка подключения к базе данных:", err);
        process.exit(1);
    } else {
        console.log("Успешное подключение к базе данных");
    }
});

module.exports = pool;
