const express = require("express");
const {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
} = require("../controllers/blogController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { validateBlogData } = require("../middleware/validationMiddleware");

const router = express.Router();

console.log("createBlog:", createBlog);
console.log("getBlogs:", getBlogs);
console.log("updateBlog:", updateBlog);
console.log("deleteBlog:", deleteBlog);
console.log("authMiddleware:", authMiddleware);
console.log("validateBlogData:", validateBlogData);

// Создание нового блога
router.post("/", authMiddleware, validateBlogData, createBlog);

// Получение всех блогов
router.get("/", authMiddleware, getBlogs);

// Обновление блога
router.put("/:blogId", authMiddleware, validateBlogData, updateBlog);

// Удаление блога
router.delete("/:blogId", authMiddleware, deleteBlog);

module.exports = router;