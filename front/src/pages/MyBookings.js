import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    // Загружаем данные из localStorage
    useEffect(() => {
        const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        setBookings(savedBookings);
    }, []);

    // Функция удаления бронирования
    const handleDelete = (index) => {
        const updatedBookings = bookings.filter((_, i) => i !== index);
        setBookings(updatedBookings);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    };

    return (
        <>
            <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center text-red-600 mb-6">Мои бронирования</h1>

                {bookings.length === 0 ? (
                    <p className="text-gray-500 text-center">У вас нет активных бронирований.</p>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking, index) => (
                            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
                                {/* Заголовок */}
                                <h2 className="text-xl font-bold text-gray-800 mb-4">
                                    {booking.applicationType === "Общежитие" ? "Общежитие" : "Барбершоп"}
                                </h2>

                                {/* Информация о бронировании общежития */}
                                {booking.applicationType === "Общежитие" ? (
                                    <div className="space-y-2">
                                        <p className="text-gray-700"><strong>Общежитие:</strong> {booking.dormitory}</p>
                                        <p className="text-gray-700"><strong>Имя:</strong> {booking.firstName} {booking.lastName}</p>
                                        <p className="text-gray-700"><strong>Комната:</strong> {booking.roomType}</p>
                                        <p className="text-gray-700"><strong>Файл:</strong> {booking.attachment ? "Прикреплён" : "Нет"}</p>
                                    </div>
                                ) : (
                                    // Информация о бронировании в барбершоп
                                    <div className="space-y-2">
                                        <p className="text-gray-700"><strong>Дата:</strong> {booking.date}</p>
                                        <p className="text-gray-700"><strong>Время:</strong> {booking.time}</p>
                                        <p className="text-gray-700"><strong>Барбер:</strong> {booking.barber}</p>
                                    </div>
                                )}

                                {/* Кнопка "Удалить" */}
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all shadow-md"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default MyBookings;
