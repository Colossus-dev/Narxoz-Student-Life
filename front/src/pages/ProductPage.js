import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const products = [
    { id: 1, name: "Футболка Narxoz", price: 5000, category: "Одежда", image: "/tshirt.jpg", sizes: ["S", "M", "L", "XL"] },
    { id: 2, name: "Худи Narxoz", price: 12000, category: "Одежда", image: "/hoodie.jpg", sizes: ["S", "M", "L", "XL"] },
    { id: 3, name: "Блокнот", price: 2500, category: "Канцелярия", image: "/notebook.jpg" },
    { id: 4, name: "Бейсболка Narxoz", price: 3000, category: "Аксессуары", image: "/cap.jpg", sizes: ["M", "L"] },
];

const ProductPage = ({ addToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find((p) => p.id === parseInt(id));

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
    const [selectedColor, setSelectedColor] = useState("Красный");

    if (!product) return <p>Товар не найден</p>;

    const totalPrice = product.price * quantity;

    const handleAddToCart = () => {
        addToCart({ ...product, quantity, size: selectedSize, color: selectedColor });
        navigate("/cart");
    };

    return (
        <>
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <img src={product.image} alt={product.name} className="w-full h-60 object-cover rounded-lg mb-4" />
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p className="text-gray-700">Цена: {product.price} ₸</p>

                {/* Выбор размера */}
                {product.sizes && (
                    <div className="mt-4">
                        <label className="font-semibold">Размер:</label>
                        <div className="flex gap-2 mt-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 rounded-lg ${
                                        selectedSize === size ? "bg-red-500 text-white" : "bg-gray-200"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Выбор количества */}
                <div className="mt-4">
                    <label className="font-semibold">Количество:</label>
                    <input
                        type="number"
                        value={quantity}
                        min="1"
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full border px-4 py-2 rounded-lg mt-2"
                    />
                </div>

                {/* Итоговая цена */}
                <p className="text-lg font-bold mt-4">Итого: {totalPrice} ₸</p>

                <button onClick={handleAddToCart} className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg w-full">
                    Добавить в корзину
                </button>
            </div>
        </>
    );
};

export default ProductPage;
