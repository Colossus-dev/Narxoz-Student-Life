import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    // Загружаем данные из localStorage при загрузке страницы
    useEffect(() => {
        const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        setBookings(savedBookings);
    }, []);

    // Функция для удаления бронирования
    const handleDelete = (index) => {
        const updatedBookings = bookings.filter((_, i) => i !== index);
        setBookings(updatedBookings);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    };

    return (
        <div>
        <Header />
        <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Мои бронирования</h1>

            {bookings.length === 0 ? (
                <p className="text-gray-600">У вас нет бронирований</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-left">Тип заявки</th>
                            <th className="border p-3 text-left">Общежитие</th>
                            <th className="border p-3 text-left">Имя</th>
                            <th className="border p-3 text-left">Фамилия</th>
                            <th className="border p-3 text-left">Город</th>
                            <th className="border p-3 text-left">Комната</th>
                            <th className="border p-3 text-left">Файл</th>
                            <th className="border p-3 text-center">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index} className="border">
                                <td className="border p-3">{booking.applicationType}</td>
                                <td className="border p-3">{booking.dormitory}</td>
                                <td className="border p-3">{booking.firstName}</td>
                                <td className="border p-3">{booking.lastName}</td>
                                <td className="border p-3">{booking.city}</td>
                                <td className="border p-3">{booking.roomType}</td>
                                <td className="border p-3">
                                    {booking.file ? (
                                        <a href="#" className="text-blue-600 hover:underline">
                                            {booking.file}
                                        </a>
                                    ) : (
                                        "Нет файла"
                                    )}
                                </td>
                                <td className="border p-3 text-center">
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
};

export default MyBookings;
