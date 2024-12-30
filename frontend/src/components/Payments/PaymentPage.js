import React, { useState } from "react";
import axios from "axios";

const PaymentPage = () => {
    const [amount, setAmount] = useState(0);
    const [paymentLink, setPaymentLink] = useState("");

    const handlePayment = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/payments/create-payment", {
                userId: "USER_ID",
                authorId: "AUTHOR_ID",
                amount,
                description: "Payment for book",
            });
            setPaymentLink(response.data.paymentLink);
        } catch (error) {
            console.error("Error creating payment link:", error);
        }
    };

    return (
        <div>
            <h2>Оплата</h2>
            <input
                type="number"
                placeholder="Введите сумму"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handlePayment}>Создать ссылку на оплату</button>
            {paymentLink && (
                <div>
                    <a href={paymentLink} target="_blank" rel="noopener noreferrer">
                        Оплатить
                    </a>
                </div>
            )}
        </div>
    );
};

export default PaymentPage;