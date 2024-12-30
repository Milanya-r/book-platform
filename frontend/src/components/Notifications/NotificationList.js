import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/notifications", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNotifications(response.data);
            } catch (error) {
                console.error("Ошибка получения уведомлений:", error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div>
            <h4>Уведомления</h4>
            <ul>
                {notifications.map((notif) => (
                    <li key={notif._id}>
                        {notif.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
