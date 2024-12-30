import React, { useState, useEffect } from "react";
import axios from "axios";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState(""); // Поисковый запрос
    const [genre, setGenre] = useState(""); // Жанр для фильтрации
    const [country, setCountry] = useState(""); // Страна для фильтрации

    // Функция для получения книг с учетом фильтров
    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/search/books", {
                params: {
                    query,
                    genre,
                    country,
                },
            });
            setBooks(response.data);
        } catch (error) {
            console.error("Ошибка получения списка книг:", error);
        }
    };

    // Используем useEffect для обновления списка книг при изменении фильтров
    useEffect(() => {
        fetchBooks();
    }, [query, genre, country]);

    return (
        <div>
            <h2>Список книг</h2>
            {/* Поля для поиска и фильтрации */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Название книги"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Жанр"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Страна"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <button onClick={fetchBooks} style={{ marginLeft: "10px" }}>
                    Искать
                </button>
            </div>
            {/* Отображение списка книг */}
            {books.length > 0 ? (
                <ul>
                    {books.map((book) => (
                        <li key={book._id}>
                            <h3>{book.title}</h3>
                            <p>{book.description}</p>
                            <p>Жанр: {book.genre}</p>
                            <p>Автор: {book.author.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Книги не найдены</p>
            )}
        </div>
    );
};

export default BookList;
