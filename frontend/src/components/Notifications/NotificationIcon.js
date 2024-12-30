import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationIcon = () => {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/notifications", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const unread = response.data.filter((notif) => !notif.isRead).length;
                setUnreadCount(unread);
            } catch (error) {
                console.error("Ошибка получения уведомлений:", error);
            }
        };

        fetchUnreadCount();
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <span role="img" aria-label="notifications">
                🔔
            </span>
            {unreadCount > 0 && (
                <span
                    style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: "10px",
                    }}
                >
                    {unreadCount}
                </span>
            )}
        </div>
    );
};

export default NotificationIcon;
