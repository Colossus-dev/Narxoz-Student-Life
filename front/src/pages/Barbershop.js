import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Barbershop = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const timeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
    const barbers = ["Алексей", "Дмитрий", "Кирилл", "Егор", "Максим"];

    const handleBooking = () => {
        if (!date || !selectedTime || !selectedBarber) {
            alert("Выберите дату, время и барбера!");
            return;
        }
        setShowConfirmation(true);
    };

    const confirmBooking = () => {
        const newBooking = {
            applicationType: "Барбершоп",
            date,
            time: selectedTime,
            barber: selectedBarber,
        };

        const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        const updatedBookings = [...existingBookings, newBooking];

        localStorage.setItem("bookings", JSON.stringify(updatedBookings));

        alert("Запись успешно сохранена!");
        setShowConfirmation(false);
        navigate("/my-bookings");
    };

    return (
        <>
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center">Narxoz Barbershop</h1>
                <p className="text-center text-gray-500 mb-4">Выберите дату, время и барбера.</p>

                <label className="block text-gray-700 font-semibold mb-2">Выберите дату:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-4"
                />

                <label className="block text-gray-700 font-semibold mb-2">Выберите время:</label>
                <div className="grid grid-cols-4 gap-2 mb-4">
                    {timeSlots.map((time) => (
                        <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`px-4 py-2 rounded-lg ${
                                selectedTime === time ? "bg-red-500 text-white" : "bg-gray-200"
                            }`}
                        >
                            {time}
                        </button>
                    ))}
                </div>

                <label className="block text-gray-700 font-semibold mb-2">Выберите барбера:</label>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {barbers.map((barber) => (
                        <button
                            key={barber}
                            onClick={() => setSelectedBarber(barber)}
                            className={`px-4 py-2 rounded-lg ${
                                selectedBarber === barber ? "bg-red-500 text-white" : "bg-gray-200"
                            }`}
                        >
                            {barber}
                        </button>
                    ))}
                </div>

                <button onClick={handleBooking} className="w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold">
                    Записаться
                </button>

                {showConfirmation && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                        <p className="text-lg font-semibold mb-2">Подтвердить запись?</p>
                        <p>{date} | {selectedTime} | {selectedBarber}</p>
                        <div className="mt-3 flex justify-center gap-4">
                            <button onClick={confirmBooking} className="bg-green-600 text-white px-6 py-2 rounded-lg">Да</button>
                            <button onClick={() => setShowConfirmation(false)} className="bg-gray-400 text-white px-6 py-2 rounded-lg">Нет</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};


export default Barbershop;
