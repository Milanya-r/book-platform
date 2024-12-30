import React, { useEffect, useState } from "react";
import axios from "axios";

const UserAchievements = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/achievements", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAchievements(response.data);
            } catch (error) {
                console.error("Ошибка получения достижений:", error);
            }
        };

        fetchAchievements();
    }, []);

    return (
        <div>
            <h4>Ваши достижения</h4>
            <ul>
                {achievements.map((ach) => (
                    <li key={ach._id}>
                        {ach.type}: {ach.points} очков
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserAchievements;
