import React, { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/chat", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessages(response.data);
            } catch (error) {
                console.error("Ошибка получения сообщений:", error);
            }
        };

        fetchMessages();
    }, []);

    const sendMessage = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:5000/api/chat",
                { content: newMessage },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessages((prev) => [response.data, ...prev]);
            setNewMessage("");
        } catch (error) {
            console.error("Ошибка отправки сообщения:", error);
        }
    };

    return (
        <div>
            <h4>Комната чата</h4>
            <ul>
                {messages.map((msg) => (
                    <li key={msg._id}>
                        <strong>{msg.userId.name}</strong>: {msg.content}
                    </li>
                ))}
            </ul>
            <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Введите сообщение"
            />
            <button onClick={sendMessage}>Отправить</button>
        </div>
    );
};

export default Chat;
