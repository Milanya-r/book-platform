const express = require("express");
const cors = require("cors");
const pool = require("./utils/database"); // Подключение к базе данных

// Подключаем маршруты
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const profileRoutes = require("./routes/profileRoutes");
const commentRoutes = require("./routes/commentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const chatRoutes = require("./routes/chatRoutes");
const taskRoutes = require("./routes/taskRoutes");
const adminRoutes = require("./routes/adminRoutes");
const searchRoutes = require("./routes/searchRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Базовый маршрут для проверки работы сервера
app.get("/", (req, res) => {
  res.send("Welcome to the Book Platform!");
});

// Подключаем все маршруты
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/blogs", blogRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await pool.connect(); // Проверка подключения к базе данных
    console.log("Подключение к базе данных успешно!");
    console.log(`Сервер запущен на порту ${PORT}`);
  } catch (error) {
    console.error("Ошибка подключения к базе данных:", error);
    process.exit(1); // Завершаем процесс при ошибке подключения
  }
});

module.exports = app;
