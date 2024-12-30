const cron = require("node-cron");
const Task = require("../models/Task");
const { sendReminderEmail } = require("../utils/emailService");

const reminderTask = () => {
    cron.schedule("0 9 * * *", async () => {
        console.log("Запуск задачи напоминания о дедлайнах...");

        try {
            const tasks = await Task.find({
                dueDate: { $gte: new Date(), $lt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
                isCompleted: false,
            }).populate("authorId");

            for (const task of tasks) {
                const email = task.authorId.email;
                const subject = `Напоминание о задаче: ${task.title}`;
                const text = `Здравствуйте, ${task.authorId.name}! У вас есть задача, срок выполнения которой истекает завтра: ${task.title}.`;

                await sendReminderEmail(email, subject, text);
            }

            console.log("Напоминания успешно отправлены.");
        } catch (error) {
            console.error("Ошибка отправки напоминаний:", error);
        }
    });
};

module.exports = reminderTask;
