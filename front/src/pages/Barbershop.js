import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Barbershop = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [timeSlots, setTimeSlots] = useState([]);
    const [barbers, setBarbers] = useState([]);

    useEffect(() => {
        const fetchBarbers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/barbershop/barbers");
                setBarbers(response.data);
            } catch (err) {
                console.error("Ошибка при получении барберов:", err);
            }
        };

        fetchBarbers();
    }, []);

    useEffect(() => {
        const fetchSlots = async () => {
            if (!date || !selectedBarber) return;

            try {
                const response = await axios.get("http://localhost:8000/api/barbershop/slots", {
                    params: {
                        date,
                        barber_name: selectedBarber.name
                    },
                    headers: {
                        Accept: "application/json"
                    }
                });
                setTimeSlots(response.data);
            } catch (err) {
                console.error("Ошибка при получении слотов:", err);
            }
        };

        fetchSlots();
    }, [date, selectedBarber]);

    const checkExistingBooking = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/my-barbershop-bookings", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data.length > 0;
    };

    const handleBooking = async () => {
        if (!date || !selectedTime || !selectedBarber) {
            alert("Выберите дату, время и барбера!");
            return;
        }

        const alreadyBooked = await checkExistingBooking();
        if (alreadyBooked) {
            alert("У вас уже есть активное бронирование!");
            return;
        }

        setShowConfirmation(true);
    };

    const confirmBooking = async () => {
        try {
            setSubmitting(true);
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:8000/api/barbershop/book",
                {
                    service: "Барбершоп",
                    date,
                    time: selectedTime,
                    barber_name: selectedBarber.name
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    },
                    withCredentials: true
                }
            );

            alert("Вы успешно записались в барбершоп!");
            setShowConfirmation(false);
            navigate("/my-bookings");
        } catch (error) {
            console.error("Ошибка при бронировании:", error);
            alert("Произошла ошибка при записи. Попробуйте снова.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
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

            <label className="block text-gray-700 font-semibold mb-2">Выберите барбера:</label>
            <div className="grid grid-cols-3 gap-2 mb-4">
                {barbers.map((barber) => (
                    <button
                        key={barber.id}
                        onClick={() => {
                            setSelectedBarber(barber);
                            setSelectedTime(null);
                        }}
                        className={`px-4 py-2 rounded-lg ${
                            selectedBarber?.id === barber.id ? "bg-red-500 text-white" : "bg-gray-200"
                        }`}
                    >
                        {barber.name}
                    </button>
                ))}
            </div>

            <label className="block text-gray-700 font-semibold mb-2">Выберите время:</label>
            <div className="grid grid-cols-4 gap-2 mb-4">
                {timeSlots.map((slot) => (
                    <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`px-4 py-2 rounded-lg ${
                            selectedTime === slot.time
                                ? "bg-red-500 text-white"
                                : "bg-gray-200"
                        } ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={!slot.available}
                    >
                        {slot.time}
                    </button>
                ))}
            </div>

            <button
                onClick={handleBooking}
                disabled={submitting}
                className="w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold"
            >
                {submitting ? "Отправка..." : "Записаться"}
            </button>

            {showConfirmation && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                    <p className="text-lg font-semibold mb-2">Подтвердить запись?</p>
                    <p>{date} | {selectedTime} | {selectedBarber?.name}</p>
                    <div className="mt-3 flex justify-center gap-4">
                        <button
                            onClick={confirmBooking}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg"
                            disabled={submitting}
                        >
                            Да
                        </button>
                        <button
                            onClick={() => setShowConfirmation(false)}
                            className="bg-gray-400 text-white px-6 py-2 rounded-lg"
                        >
                            Нет
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Barbershop;