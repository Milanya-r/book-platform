const pool = require("../utils/database");

// Создание жалобы
exports.createReport = async (req, res) => {
    const { reportedId, reportType, reason } = req.body;

    // Валидация данных
    if (!reportedId || !reportType || !reason) {
        return res.status(400).json({ error: "Все поля обязательны для создания жалобы" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO reports (reported_id, report_type, reason, reported_by) VALUES ($1, $2, $3, $4) RETURNING *",
            [reportedId, reportType, reason, req.userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка создания жалобы:", error);
        res.status(500).json({ error: "Ошибка создания жалобы" });
    }
};

// Получение всех жалоб
exports.getReports = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT reports.id, reports.report_type, reports.reason, reports.status, reports.created_at,
                    users.name AS reported_by_name
             FROM reports
             JOIN users ON reports.reported_by = users.id
             ORDER BY reports.created_at DESC`
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Нет жалоб" });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Ошибка получения жалоб:", error);
        res.status(500).json({ error: "Ошибка получения жалоб" });
    }
};

// Обновление статуса жалобы
exports.updateReportStatus = async (req, res) => {
    const { reportId } = req.params;
    const { status } = req.body;

    // Валидация статуса
    if (!status || !['resolved', 'pending', 'rejected'].includes(status)) {
        return res.status(400).json({ error: "Неверный статус жалобы" });
    }

    try {
        const result = await pool.query(
            "UPDATE reports SET status = $1 WHERE id = $2 RETURNING *",
            [status, reportId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Жалоба не найдена" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Ошибка обновления статуса жалобы:", error);
        res.status(500).json({ error: "Ошибка обновления статуса жалобы" });
    }
};
