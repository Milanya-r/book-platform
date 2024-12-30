const Notification = require("../models/Notification");

// Получение уведомлений для пользователя
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.userId })
            .sort({ createdAt: -1 }); // Сортируем уведомления по дате создания (по убыванию)
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Ошибка получения уведомлений:", error);
        res.status(500).json({ error: "Ошибка получения уведомлений" });
    }
};

// Отметить уведомление как прочитанное
exports.markAsRead = async (req, res) => {
    const { notificationId } = req.params;

    try {
        const notification = await Notification.findById(notificationId);
        if (!notification) return res.status(404).json({ error: "Уведомление не найдено" });

        // Если уведомление уже прочитано
        if (notification.isRead) {
            return res.status(400).json({ message: "Уведомление уже прочитано" });
        }

        notification.isRead = true; // Отметить как прочитанное
        await notification.save();

        res.status(200).json({ message: "Уведомление обновлено", notification });
    } catch (error) {
        console.error("Ошибка обновления уведомления:", error);
        res.status(500).json({ error: "Ошибка обновления уведомления" });
    }
};
