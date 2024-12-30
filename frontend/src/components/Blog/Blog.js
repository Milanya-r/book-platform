import React, { useState, useEffect } from "react";
import axios from "axios";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({ title: "", content: "" });

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/blogs");
                setBlogs(response.data);
            } catch (error) {
                console.error("Ошибка получения блогов:", error);
            }
        };

        fetchBlogs();
    }, []);

    const createBlog = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:5000/api/blogs",
                newBlog,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBlogs((prev) => [response.data, ...prev]);
            setNewBlog({ title: "", content: "" });
        } catch (error) {
            console.error("Ошибка создания блога:", error);
        }
    };

    return (
        <div>
            <h4>Блоги авторов</h4>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog._id}>
                        <strong>{blog.title}</strong> - {blog.content}
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                />
                <textarea
                    placeholder="Контент"
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                />
                <button onClick={createBlog}>Создать блог</button>
            </div>
        </div>
    );
};

export default Blog;
