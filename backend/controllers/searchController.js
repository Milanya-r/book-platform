const pool = require("../utils/database");

// Поиск книг
exports.searchBooks = async (req, res) => {
    const { query, genre, country, minRating, maxRating } = req.query;

    try {
        const filters = [];
        const values = [];
        let paramIndex = 1; // Индекс для параметров SQL-запроса

        if (query) {
            filters.push(`title ILIKE $${paramIndex}`);
            values.push(`%${query}%`);
            paramIndex++;
        }
        if (genre) {
            filters.push(`genre = $${paramIndex}`);
            values.push(genre);
            paramIndex++;
        }
        if (country) {
            filters.push(`country = $${paramIndex}`);
            values.push(country);
            paramIndex++;
        }
        if (minRating) {
            filters.push(`rating >= $${paramIndex}`);
            values.push(Number(minRating));
            paramIndex++;
        }
        if (maxRating) {
            filters.push(`rating <= $${paramIndex}`);
            values.push(Number(maxRating));
            paramIndex++;
        }

        let queryText = "SELECT * FROM books";
        if (filters.length > 0) {
            queryText += ` WHERE ${filters.join(" AND ")}`;
        }
        queryText += " ORDER BY created_at DESC";

        const result = await pool.query(queryText, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Книги не найдены" });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Ошибка поиска книг:", error);
        res.status(500).json({ error: "Ошибка поиска книг" });
    }
};

// Поиск авторов
exports.searchAuthors = async (req, res) => {
    const { query, active, sort } = req.query;

    try {
        const filters = [];
        const values = [];
        let paramIndex = 1;

        if (query) {
            filters.push(`name ILIKE $${paramIndex}`);
            values.push(`%${query}%`);
            paramIndex++;
        }
        if (active) {
            filters.push(`is_active = $${paramIndex}`);
            values.push(active === "true");
            paramIndex++;
        }

        let queryText = "SELECT * FROM authors";
        if (filters.length > 0) {
            queryText += ` WHERE ${filters.join(" AND ")}`;
        }

        queryText += ` ORDER BY created_at ${sort === "newest" ? "DESC" : "ASC"}`;

        const result = await pool.query(queryText, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Авторы не найдены" });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Ошибка поиска авторов:", error);
        res.status(500).json({ error: "Ошибка поиска авторов" });
    }
};
