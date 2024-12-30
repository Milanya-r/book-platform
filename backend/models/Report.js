const pool = require("../utils/database");

// Функция для создания нового отчёта
async function createReport(reportedId, reportType, reason, reportedBy, status = "active") {
    const createdAt = new Date();
    const result = await pool.query(
        "INSERT INTO reports (reported_id, report_type, reason, reported_by, status, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [reportedId, reportType, reason, reportedBy, status, createdAt]
    );
    return result.rows[0];
}

// Функция для получения всех отчётов
async function getAllReports() {
    const result = await pool.query("SELECT * FROM reports ORDER BY created_at DESC");
    return result.rows;
}

// Функция для обновления статуса отчёта
async function updateReportStatus(reportId, status) {
    const result = await pool.query(
        "UPDATE reports SET status = $1 WHERE id = $2 RETURNING *",
        [status, reportId]
    );
    return result.rows[0];
}

// Экспорт функций
module.exports = {
    createReport,
    getAllReports,
    updateReportStatus,
};
