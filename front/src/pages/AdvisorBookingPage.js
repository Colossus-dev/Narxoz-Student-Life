import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const timeSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

const schools = {
    "Школа Цифровых Технологии": ["Digital Engineering", "Digital Management and Design"],
    "Школа Экономики и Менеджмента": ["Учет и Аудит", "Менеджмент", "Экономика", "Маркетинг"],
    "Школа права и государственного управления": ["Факультет права", "Государственное управление"],
    "Гуманитарная школа": [],
    "Narxoz Business School": [],
};

const AdvisorBookingPage = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [time, setTime] = useState(null);
    const [school, setSchool] = useState("");
    const [faculty, setFaculty] = useState("");
    const [description, setDescription] = useState("");
    const [occupied, setOccupied] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (!date) return;

        axios.get("http://localhost:8000/api/advisor-bookings/occupied", {
            params: { date },
        }).then(res => {
            setOccupied(res.data);
        }).catch(() => setOccupied([]));
    }, [date]);

    const handleBooking = () => {
        if (!school || !faculty || !date || !time || !description) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }
        setShowConfirm(true);
    };

    const confirmBooking = async () => {
        try {
            setSubmitting(true);
            const token = localStorage.getItem("token");

            await axios.post("http://localhost:8000/api/advisor-bookings", {
                school,
                faculty,
                date,
                time,
                description,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Вы успешно записались к эдвайзеру!");
            navigate("/my-bookings");
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка. Попробуйте позже.");
        } finally {
            setSubmitting(false);
            setShowConfirm(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center">Запись к эдвайзеру</h1>
            <p className="text-center text-gray-500 mb-4">Выберите дату, время и школу</p>

            <label className="block font-semibold mb-1">Дата</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
            />

            <label className="block font-semibold mb-1">Школа</label>
            <select
                value={school}
                onChange={(e) => {
                    setSchool(e.target.value);
                    setFaculty("");
                }}
                className="w-full border rounded px-3 py-2 mb-4"
            >
                <option value="">Выберите школу</option>
                {Object.keys(schools).map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>

            <label className="block font-semibold mb-1">Факультет</label>
            <select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                disabled={!school}
                className="w-full border rounded px-3 py-2 mb-4"
            >
                <option value="">Выберите факультет</option>
                {schools[school]?.map((f) => (
                    <option key={f} value={f}>{f}</option>
                ))}
            </select>

            <label className="block font-semibold mb-1">Время</label>
            <div className="grid grid-cols-4 gap-2 mb-4">
                {timeSlots.map((slot) => (
                    <button
                        key={slot}
                        disabled={occupied.includes(slot)}
                        onClick={() => setTime(slot)}
                        className={`px-3 py-1 rounded ${
                            time === slot ? "bg-red-600 text-white" : "bg-gray-200"
                        } ${occupied.includes(slot) ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {slot}
                    </button>
                ))}
            </div>

            <label className="block font-semibold mb-1">Описание вопроса</label>
            <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-6"
                placeholder="Кратко опишите суть вопроса"
            />

            <button
                onClick={handleBooking}
                disabled={submitting}
                className="w-full bg-red-600 text-white py-2 rounded-lg"
            >
                {submitting ? "Отправка..." : "Записаться"}
            </button>

            {showConfirm && (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg text-center">
                    <p className="font-semibold mb-2">Подтвердить запись?</p>
                    <p>{date} | {time} | {school} - {faculty}</p>
                    <div className="mt-3 flex justify-center gap-4">
                        <button
                            onClick={confirmBooking}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                            Да
                        </button>
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                        >
                            Нет
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvisorBookingPage;
