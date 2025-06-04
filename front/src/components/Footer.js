import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaEnvelope, FaPhoneAlt, FaChevronUp, FaHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // ✅ импорт переводов

const Footer = () => {
    const [showTop, setShowTop] = useState(false);
    const { t } = useTranslation(); // ✅ инициализация

    useEffect(() => {
        const toggleVisible = () => {
            setShowTop(window.scrollY > 300);
        };
        window.addEventListener("scroll", toggleVisible);
        return () => window.removeEventListener("scroll", toggleVisible);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <footer className="bg-gray-100 text-gray-800 pt-10 pb-6 border-t border-gray-300">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-sm">
                    {/* Блок 1: Название */}
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-2xl font-extrabold text-gray-900">Narxoz Life</h2>
                        <p className="text-gray-600">{t("footer.tagline")}</p>
                        <p className="text-gray-500">© 2025 {t("footer.rights")}</p>
                    </div>

                    {/* Блок 2: Навигация */}
                    <div className="text-center md:text-left">
                        <h3 className="text-gray-900 font-semibold mb-2">{t("footer.navigation")}</h3>
                        <ul className="space-y-1">
                            <li><Link to="/" className="text-gray-600 hover:text-gray-900 transition">{t("header.home")}</Link></li>
                            <li><Link to="/booking" className="text-gray-600 hover:text-gray-900 transition">{t("header.booking")}</Link></li>
                            <li><Link to="/my-bookings" className="text-gray-600 hover:text-gray-900 transition">{t("header.myBookings")}</Link></li>
                        </ul>
                    </div>

                    {/* Блок 3: Контакты */}
                    <div className="text-center md:text-right space-y-2">
                        <h3 className="text-gray-900 font-semibold mb-2">{t("footer.contacts")}</h3>
                        <p className="flex justify-center md:justify-end items-center gap-2 text-gray-600">
                            <FaEnvelope /> support@narxoz.kz
                        </p>
                        <p className="flex justify-center md:justify-end items-center gap-2 text-gray-600">
                            <FaPhoneAlt /> +7 (777) 123-45-67
                        </p>
                        <a
                            href="https://instagram.com/narxozuniversity"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center md:justify-end items-center gap-2 text-[#D50032] hover:text-red-600 transition"
                        >
                            <FaInstagram /> Instagram
                        </a>
                    </div>
                </div>

                {/* Made with ❤️ */}
                <div className="mt-8 text-center text-sm text-gray-500 flex items-center justify-center gap-1">
                    {t("footer.madeWith")} <FaHeart className="text-red-500 animate-pulse" /> Narxoz
                </div>
            </footer>

            {/* Кнопка "Вверх" */}
            {showTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-[#D50032] hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition z-50"
                    title={t("footer.scrollTop")}
                >
                    <FaChevronUp />
                </button>
            )}
        </>
    );
};

export default Footer;
