const cron = require("node-cron");
const Notification = require("../models/Notification");

const notificationTask = () => {
    cron.schedule("*/10 * * * * *", async () => {
        console.log("Проверка новых уведомлений...");

        try {
            const notifications = await Notification.find({ isRead: false });

            notifications.forEach((notif) => {
                console.log("Новое уведомление:", notif.message);
            });
        } catch (error) {
            console.error("Ошибка проверки уведомлений:", error);
        }
    });
};

module.exports = notificationTask;
