import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTranslation } from "react-i18next";

const Shop = ({ cart }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(["all"]);
    const [loading, setLoading] = useState(true);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/products");
                const data = response.data;

                setProducts(data);

                const uniqueCategories = [...new Set(data.map(p => p.category))];
                setCategories(["all", ...uniqueCategories]);
            } catch (error) {
                console.error("Ошибка загрузки продуктов:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter((p) => p.category === selectedCategory);

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg relative">
            <h1 className="text-3xl font-bold text-center mb-6">{t("shop.title")}</h1>

            {/* Фильтр по категориям */}
            <div className="flex justify-center gap-4 mb-6 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg transition ${
                            selectedCategory === cat ? "bg-red-500 text-white" : "bg-gray-200"
                        }`}
                    >
                        {cat === "all" ? t("shop.all") : cat}
                    </button>
                ))}
            </div>

            {/* Загрузка или товары */}
            {loading ? (
                <p className="text-center text-gray-500">{t("shop.loading")}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="border p-4 rounded-lg shadow-lg">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/fallback.jpg";
                                }}
                            />
                            <h2 className="text-lg font-bold">{product.name}</h2>
                            <p className="text-gray-700">
                                {t("shop.price")}: {product.price} ₸
                            </p>
                            <button
                                onClick={() => navigate(`/shop/${product.id}`)}
                                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg w-full"
                            >
                                {t("shop.details")}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Плавающая кнопка корзины */}
            <div
                className="fixed bottom-6 right-6 z-50"
                onMouseEnter={() => setShowPreview(true)}
                onMouseLeave={() => setShowPreview(false)}
            >
                <button
                    onClick={() => navigate("/cart")}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-red-700 transition-all"
                >
                    <ShoppingCartIcon />
                    <span className="font-semibold">
                        {t("shop.cart")} ({cart.length})
                    </span>
                </button>

                {/* Превью содержимого корзины */}
                {showPreview && cart.length > 0 && (
                    <div className="absolute bottom-16 right-0 bg-white border border-gray-300 shadow-xl rounded-lg w-72 p-4 text-sm">
                        <h3 className="font-bold mb-2">{t("shop.in_cart")}</h3>
                        <ul className="space-y-1 max-h-40 overflow-auto">
                            {cart.map((item, i) => (
                                <li key={i} className="flex justify-between border-b pb-1">
                                    <span>{item.name}</span>
                                    <span>x{item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-right font-semibold mt-2">
                            {t("shop.total")}: {cart.reduce((sum, i) => sum + i.price * i.quantity, 0)} ₸
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
