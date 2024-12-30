import React, { useState, useEffect } from "react";
import axios from "axios";

const BookSearch = () => {
    const [filters, setFilters] = useState({
        query: "",
        genre: "",
        country: "",
    });
    const [books, setBooks] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/search/books", {
                params: filters,
            });
            setBooks(response.data);
        } catch (error) {
            console.error("Ошибка поиска книг:", error);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div>
            <h4>Поиск книг</h4>
            <div>
                <input
                    type="text"
                    placeholder="Название книги"
                    value={filters.query}
                    onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                />
                <select
                    value={filters.genre}
                    onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                >
                    <option value="">Все жанры</option>
                    <option value="fantasy">Фэнтези</option>
                    <option value="romance">Роман</option>
                    <option value="thriller">Триллер</option>
                </select>
                <input
                    type="text"
                    placeholder="Страна"
                    value={filters.country}
                    onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                />
                <button onClick={handleSearch}>Искать</button>
            </div>
            <ul>
                {books.map((book) => (
                    <li key={book._id}>
                        <strong>{book.title}</strong> - {book.genre} (Страна: {book.country || "Не указана"})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookSearch;
