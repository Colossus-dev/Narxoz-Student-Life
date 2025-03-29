// 🔄 MyBookings.js (динамичный и стильный дизайн + карточки по центру)

import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaFileAlt, FaTrash, FaCut, FaCheckCircle } from "react-icons/fa";
import api from "../utils/api";
import PaymentModal from "../components/PaymentModal";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const dormResponse = await api.get("/my-bookings", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                const dormBookings = dormResponse.data.map((item) => ({
                    applicationType: "Общежитие",
                    dormitory: item.room?.dormitory?.name || "Не указано",
                    roomType: item.room?.capacity || "—",
                    firstName: user?.name?.split(" ")[0],
                    lastName: user?.name?.split(" ")[1] || "",
                    file: item.attached_files?.length > 0,
                    id: item.id,
                    status: item.status,
                    payment_status: item.payment_status,
                    contract_signed: item.contract_signed,
                }));

                const localBarbers = JSON.parse(localStorage.getItem("bookings")) || [];

                setBookings([...dormBookings, ...localBarbers]);
            } catch (error) {
                console.error("Ошибка при загрузке бронирований:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchData();
    }, [user]);

    const handleDelete = (index) => {
        const updated = bookings.filter((_, i) => i !== index);
        setBookings(updated);
        localStorage.setItem(
            "bookings",
            JSON.stringify(updated.filter((b) => b.applicationType === "Барбершоп"))
        );
    };

    const handlePayment = async (bookingId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(`http://localhost:8000/api/bookings/${bookingId}/pay`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            setBookings((prev) =>
                prev.map((b) =>
                    b.id === bookingId ? { ...b, payment_status: "paid" } : b
                )
            );
        } catch (e) {
            console.error("Ошибка оплаты", e);
        }
    };

    const handleSignContract = async (bookingId) => {
        try {
            await api.post(`/bookings/${bookingId}/sign`);
            setBookings((prev) =>
                prev.map((b) =>
                    b.id === bookingId ? { ...b, contract_signed: true } : b
                )
            );
        } catch (e) {
            console.error("Ошибка подписания", e);
        }
    };

    if (loading)
        return <p className="text-center text-gray-500 font-light text-lg">Загрузка бронирований...</p>;

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4 font-sans text-center">
            <h1 className="text-4xl font-extrabold text-[#D50032] mb-10">
                🗂️ Мои бронирования
            </h1>

            {bookings.length === 0 ? (
                <p className="text-gray-500 text-lg">
                    У вас пока нет активных бронирований.
                </p>
            ) : (
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                        {bookings.map((booking, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative rounded-2xl shadow-lg p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-2xl transition-all text-left"
                            >
                                {booking.applicationType === "Барбершоп" && (
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="absolute -top-3 -right-3 bg-white shadow p-2 rounded-full text-red-600 hover:text-red-800 z-10"
                                        title="Удалить бронирование"
                                    >
                                        <FaTrash size={16} />
                                    </button>
                                )}

                                <div className="flex items-center gap-3 mb-3">
                                    {booking.applicationType === "Общежитие" ? (
                                        <>
                                            <FaHome className="text-[#D50032] text-lg" />
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                Бронирование общежития
                                            </h2>
                                        </>
                                    ) : (
                                        <>
                                            <FaCut className="text-[#D50032] text-lg" />
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                Барбершоп
                                            </h2>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-1 text-gray-700 text-sm">
                                    {booking.applicationType === "Общежитие" ? (
                                        <>
                                            <p><strong>Общежитие:</strong> {booking.dormitory}</p>
                                            <p><strong>Комната:</strong> {booking.roomType}</p>
                                            <p><FaUser className="inline mr-1 text-gray-500" /> {booking.firstName} {booking.lastName}</p>
                                            <p><FaFileAlt className="inline mr-1 text-gray-500" /> {booking.file ? "📎 Прикреплён" : "—"}</p>

                                            {booking.status === "approved" && (
                                                <div className="mt-4">
                                                    <p className="text-green-600 font-semibold mb-2">
                                                        ✅ Ваша заявка одобрена!
                                                    </p>

                                                    {booking.payment_status !== "paid" ? (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedBookingId(booking.id);
                                                                setShowModal(true);
                                                            }}
                                                            className="bg-[#D50032] text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                                                        >
                                                            Оплатить
                                                        </button>
                                                    ) : !booking.contract_signed ? (
                                                        <div className="mt-4 bg-gray-50 border p-4 rounded-xl">
                                                            <h4 className="font-bold mb-2 text-[#D50032]">📄 Договор</h4>
                                                            <p className="text-sm text-gray-600 mb-4">
                                                                Я подтверждаю, что ознакомлен(а) с условиями проживания и обязуюсь соблюдать внутренние правила общежития Нархоз Университета.
                                                            </p>
                                                            <button
                                                                onClick={() => handleSignContract(booking.id)}
                                                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                                            >
                                                                Принять условия
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-green-700 font-medium mt-2 flex items-center gap-2">
                                                            <FaCheckCircle className="text-green-600" /> Вы оплатили и подписали договор
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <p><strong>Дата:</strong> {booking.date}</p>
                                            <p><strong>Время:</strong> {booking.time}</p>
                                            <p><strong>Барбер:</strong> {booking.barber}</p>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            <PaymentModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => handlePayment(selectedBookingId)}
            />
        </div>
    );
};

export default MyBookings;
