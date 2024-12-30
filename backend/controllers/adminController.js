const pool = require("../utils/database");

// Пример функции для удаления книги
async function deleteBook(req, res) {
  const { bookId } = req.params;

  if (!bookId) {
    return res.status(400).json({ error: "Book ID is required" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *", 
      [bookId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", book: result.rows[0] });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Error deleting book" });
  }
}

// Новая функция для удаления пользователя
async function deleteUser(req, res) {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user: result.rows[0] });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
}

module.exports = { deleteBook, deleteUser };
