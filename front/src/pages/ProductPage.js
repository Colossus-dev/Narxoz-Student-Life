import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductPage = ({ addToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/products/${id}`);
                setProduct(res.data);
                if (res.data.sizes && res.data.sizes.length > 0) {
                    setSelectedSize(res.data.sizes[0]);
                }
            } catch (error) {
                console.error("Ошибка при загрузке товара:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Загрузка...</p>;
    if (!product) return <p className="text-center mt-10 text-red-500">Товар не найден</p>;

    const totalPrice = product.price * quantity;

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            image: product.image_url,
            price: product.price,
            size: selectedSize,
            quantity,
        });
        navigate("/cart");
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-60 object-cover rounded-lg mb-4"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback.jpg";
                }}
            />
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-700">Цена: {product.price} ₸</p>

            {/* Размер */}
            {Array.isArray(product.sizes) && product.sizes.length > 0 && (
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


            {/* Кол-во */}
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

            {/* Сумма */}
            <p className="text-lg font-bold mt-4">Итого: {totalPrice} ₸</p>

            <button
                onClick={handleAddToCart}
                className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg w-full"
            >
                Добавить в корзину
            </button>
        </div>
    );
};

export default ProductPage;
