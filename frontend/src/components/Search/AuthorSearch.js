import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthorSearch = () => {
    const [filters, setFilters] = useState({
        query: "",
        active: "",
        sort: "",
    });
    const [authors, setAuthors] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/search/authors", {
                params: filters,
            });
            setAuthors(response.data);
        } catch (error) {
            console.error("Ошибка поиска авторов:", error);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div>
            <h4>Поиск авторов</h4>
            <div>
                <input
                    type="text"
                    placeholder="Имя автора"
                    value={filters.query}
                    onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                />
                <select
                    value={filters.active}
                    onChange={(e) => setFilters({ ...filters, active: e.target.value })}
                >
                    <option value="">Все</option>
                    <option value="true">Активные</option>
                    <option value="false">Неактивные</option>
                </select>
                <select
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                >
                    <option value="">По умолчанию</option>
                    <option value="newest">Новые</option>
                    <option value="oldest">Старые</option>
                </select>
                <button onClick={handleSearch}>Искать</button>
            </div>
            <ul>
                {authors.map((author) => (
                    <li key={author._id}>
                        <strong>{author.name}</strong> - {author.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorSearch;
