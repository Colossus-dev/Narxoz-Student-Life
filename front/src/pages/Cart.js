import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const Cart = ({ cart, removeFromCart, clearCart }) => {
    const navigate = useNavigate();

    // Общая сумма
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert("Ваша корзина пуста.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8000/api/orders", {
                items: cart.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    size: item.size || null,
                })),
                total: totalAmount,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            clearCart(); // <== Очистка корзины (ты должен передать эту функцию как пропс)
            navigate("/order-success");
        } catch (error) {
            console.error("Ошибка при оформлении:", error);
            alert("Ошибка при оформлении заказа");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Корзина</h1>

            {cart.length === 0 ? (
                <p className="text-center text-gray-500">Ваша корзина пуста.</p>
            ) : (
                <div className="space-y-6">
                    {cart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between border p-4 rounded-lg shadow">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />

                            <div className="flex-1 ml-4">
                                <h2 className="text-lg font-bold">{item.name}</h2>
                                <p className="text-gray-700">Цена: {item.price} ₸</p>
                                {item.size && <p className="text-gray-700">Размер: {item.size}</p>}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        if (item.quantity > 1) {
                                            item.quantity -= 1;
                                            navigate("/cart");
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
                                        navigate("/cart");
                                    }}
                                    className="bg-gray-300 px-3 py-1 rounded-lg"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(index)}
                                className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Удалить
                            </button>
                        </div>
                    ))}

                    <h2 className="text-xl font-bold text-right mt-4">Итого: {totalAmount} ₸</h2>

                    <button
                        onClick={handleCheckout}
                        className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold"
                    >
                        Оформить заказ
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
