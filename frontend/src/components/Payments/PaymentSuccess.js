import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("orderId");

    return (
        <div>
            <h1>Оплата успешно завершена!</h1>
            <p>Ваш номер заказа: {orderId}</p>
            <p>Спасибо за оплату! Вы можете вернуться к чтению.</p>
        </div>
    );
};

export default PaymentSuccess;