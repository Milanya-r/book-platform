import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/profiles/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Ошибка получения профиля пользователя:", error);
            }
        };

        fetchUser();
    }, []);

    if (!user) return <p>Загрузка...</p>;

    return (
        <div>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Страна: {user.country || "Не указана"}</p>
        </div>
    );
};

export default UserProfile;
