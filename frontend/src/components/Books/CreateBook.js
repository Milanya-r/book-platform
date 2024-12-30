import React, { useState } from "react";
import axios from "axios";

const CreateBook = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/books/create", {
                title,
                description,
                genre,
                author: "AUTHOR_ID", // Замените на текущего автора
            });
            alert("Книга успешно создана!");
            console.log(response.data);
        } catch (error) {
            alert("Ошибка при создании книги");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Создать книгу</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Название"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Жанр"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                />
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default CreateBook;