import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="max-w-xl mx-auto mt-20 p-8 bg-green-100 text-center shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-green-700 mb-4">Спасибо за ваш заказ!</h1>
            <p className="text-lg text-gray-800 mb-6">
                Ваш заказ успешно оформлен. Оплата производится при получении товара.
                <br />
                Забрать можно в нашем магазине на территории университета.
            </p>
            <Link
                to="/shop"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
                Вернуться в магазин
            </Link>
        </div>
    );
};

export default OrderSuccess;
