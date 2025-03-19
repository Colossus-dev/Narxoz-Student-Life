import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const categories = ["Одежда", "Аксессуары", "Канцелярия"];

const products = [
    { id: 1, name: "Футболка Narxoz", price: 5000, category: "Одежда", image: "/tshirt.jpg" },
    { id: 2, name: "Худи Narxoz", price: 12000, category: "Одежда", image: "/hoodie.jpg" },
    { id: 3, name: "Блокнот", price: 2500, category: "Канцелярия", image: "/notebook.jpg" },
    { id: 4, name: "Бейсболка Narxoz", price: 3000, category: "Аксессуары", image: "/cap.jpg" },
];

const Shop = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("Все");

    const filteredProducts =
        selectedCategory === "Все" ? products : products.filter((p) => p.category === selectedCategory);

    return (
        <>
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Narxoz Shop</h1>

                {/* Фильтр по категориям */}
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => setSelectedCategory("Все")}
                        className={`px-4 py-2 rounded-lg ${selectedCategory === "Все" ? "bg-red-500 text-white" : "bg-gray-200"}`}
                    >
                        Все
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg ${selectedCategory === cat ? "bg-red-500 text-white" : "bg-gray-200"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Товары */}
                <div className="grid grid-cols-2 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="border p-4 rounded-lg shadow-lg">
                            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                            <h2 className="text-lg font-bold">{product.name}</h2>
                            <p className="text-gray-700">Цена: {product.price} ₸</p>
                            <button
                                onClick={() => navigate(`/shop/${product.id}`)}
                                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Подробнее
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Shop;
