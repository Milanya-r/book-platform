const crypto = require("crypto");
const pool = require("../utils/database"); // Подключение к PostgreSQL

const merchantId = "your_merchant_id";
const secretKey = "your_secret_key";
const secretKey2 = "your_secret_key_2";
const commissionRate = 0.05;

// Создание ссылки на оплату
exports.createPayment = async (req, res) => {
    const { userId, authorId, amount, description } = req.body;

    if (!userId || !authorId || !amount || !description) {
        return res.status(400).json({ error: "Недостаточно данных для создания платежа" });
    }

    try {
        // Расчёт комиссии
        const commission = amount * commissionRate;

        // Сохранение данных платежа в PostgreSQL
        const result = await pool.query(
            "INSERT INTO payments (user_id, author_id, amount, description, commission) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [userId, authorId, amount, description, commission]
        );
        const orderId = result.rows[0].id;

        // Генерация подписи
        const sign = crypto
            .createHash("md5")
            .update(`${merchantId}:${amount}:${secretKey}:${orderId}`)
            .digest("hex");

        // Формирование ссылки на оплату
        const paymentLink = `https://www.free-kassa.ru/merchant/cash.php?m=${merchantId}&oa=${amount}&o=${orderId}&s=${sign}`;

        res.status(200).json({ paymentLink });
    } catch (error) {
        console.error("Ошибка создания платежа:", error);
        res.status(500).json({ error: "Ошибка создания ссылки для оплаты" });
    }
};

// Обработка уведомления
exports.processCallback = async (req, res) => {
    const { AMOUNT, MERCHANT_ORDER_ID, SIGN } = req.body;

    if (!AMOUNT || !MERCHANT_ORDER_ID || !SIGN) {
        return res.status(400).json({ error: "Неверные данные в запросе" });
    }

    try {
        // Генерация подписи
        const sign = crypto
            .createHash("md5")
            .update(`${merchantId}:${AMOUNT}:${secretKey2}:${MERCHANT_ORDER_ID}`)
            .digest("hex");

        // Проверка подписи
        if (sign !== SIGN) {
            return res.status(400).json({ error: "Неверная подпись" });
        }

        // Обновление статуса платежа в базе данных
        const result = await pool.query(
            "SELECT * FROM payments WHERE id = $1", 
            [MERCHANT_ORDER_ID]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Платеж не найден" });
        }

        // Платеж существует, обновляем его статус
        await pool.query(
            "UPDATE payments SET status = $1 WHERE id = $2",
            ["completed", MERCHANT_ORDER_ID]
        );

        res.status(200).json({ message: "Платеж успешно обработан" });
    } catch (error) {
        console.error("Ошибка обработки платежа:", error);
        res.status(500).json({ error: "Ошибка обработки платежа" });
    }
};
