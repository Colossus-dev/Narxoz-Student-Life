import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                {/* Логотип и текст */}
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <h2 className="text-xl font-bold">Narxoz Student Life</h2>
                    <p className="text-gray-400 text-sm">Все права защищены © 2025</p>
                </div>

                {/* Навигация */}
                <div className="flex space-x-6">
                    <Link to="/" className="text-gray-300 hover:text-white transition">Главная</Link>
                    <Link to="/shop" className="text-gray-300 hover:text-white transition">Магазин</Link>
                    <Link to="/booking" className="text-gray-300 hover:text-white transition">Бронирование</Link>
                    <Link to="/my-bookings" className="text-gray-300 hover:text-white transition">Мои бронирования</Link>
                    <Link to="/barbershop" className="text-gray-300 hover:text-white transition">Барбершоп</Link>
                </div>

                {/* Контакты */}
                <div className="text-center md:text-right">
                    <p className="text-gray-400 text-sm">Email: support@narxoz.kz</p>
                    <p className="text-gray-400 text-sm">Телефон: +7 (777) 123-45-67</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
