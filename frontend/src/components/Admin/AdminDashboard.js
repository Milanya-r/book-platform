import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/admin/reports", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setReports(response.data);
            } catch (error) {
                console.error("Ошибка получения жалоб:", error);
            }
        };

        fetchReports();
    }, []);

    const resolveReport = async (reportId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(
                `http://localhost:5000/api/admin/reports/${reportId}`,
                { status: "resolved" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReports((prev) => prev.filter((report) => report._id !== reportId));
        } catch (error) {
            console.error("Ошибка обновления статуса жалобы:", error);
        }
    };

    return (
        <div>
            <h4>Панель администратора</h4>
            <ul>
                {reports.map((report) => (
                    <li key={report._id}>
                        {report.reportType} - {report.reason}
                        <button onClick={() => resolveReport(report._id)}>Решить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
