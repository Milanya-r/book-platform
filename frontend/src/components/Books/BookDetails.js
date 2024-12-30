import React, { useState, useEffect } from "react";
import axios from "axios";

const BookDetails = ({ match }) => {
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/${match.params.id}`);
                setBook(response.data);
            } catch (error) {
                console.error("Ошибка получения книги:", error);
            }
        };
        fetchBook();
    }, [match.params.id]);

    if (!book) return <p>Загрузка...</p>;

    return (
        <div>
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <p>Жанр: {book.genre}</p>
            <p>Автор: {book.author.name}</p>
        </div>
    );
};

export default BookDetails;