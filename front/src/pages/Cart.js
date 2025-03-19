import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Cart = ({ cart, removeFromCart }) => {
    const navigate = useNavigate();

    // Рассчитываем общую стоимость
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Оформление заказа (эмуляция)
    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Ваша корзина пуста.");
            return;
        }

        alert(`Заказ на сумму ${totalAmount} ₸ успешно оформлен!`);
        navigate("/shop"); // ✅ Перенаправляем пользователя обратно в магазин
    };

    return (
        <>
            <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Корзина</h1>

                {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Ваша корзина пуста.</p>
                ) : (
                    <div className="space-y-6">
                        {cart.map((item, index) => (
                            <div key={index} className="flex items-center justify-between border p-4 rounded-lg shadow">
                                {/* Изображение товара */}
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />

                                {/* Информация о товаре */}
                                <div className="flex-1 ml-4">
                                    <h2 className="text-lg font-bold">{item.name}</h2>
                                    <p className="text-gray-700">Цена: {item.price} ₸</p>
                                    <p className="text-gray-700">Цвет: {item.color}</p>
                                    {item.size && <p className="text-gray-700">Размер: {item.size}</p>}
                                </div>

                                {/* Количество товара */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            if (item.quantity > 1) {
                                                item.quantity -= 1;
                                                navigate("/cart"); // Обновляем корзину
                                            }
                                        }}
                                        className="bg-gray-300 px-3 py-1 rounded-lg"
                                    >
                                        −
                                    </button>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <button
                                        onClick={() => {
                                            item.quantity += 1;
                                            navigate("/cart"); // Обновляем корзину
                                        }}
                                        className="bg-gray-300 px-3 py-1 rounded-lg"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Кнопка удаления товара */}
                                <button
                                    onClick={() => removeFromCart(index)}
                                    className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Удалить
                                </button>
                            </div>
                        ))}

                        {/* Итоговая сумма */}
                        <h2 className="text-xl font-bold text-right mt-4">Итого: {totalAmount} ₸</h2>

                        {/* Кнопка оформления заказа */}
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold"
                        >
                            Оформить заказ
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
