import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Booking = () => {
    const navigate = useNavigate(); // Используем для перенаправления на MyBookings

    const [formData, setFormData] = useState({
        applicationType: "Общежитие", // Тип заявки
        dormitory: "",
        firstName: "",
        lastName: "",
        city: "",
        roomType: "",
        file: null,
    });

    const [errors, setErrors] = useState({});

    // Обновление данных формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Обработка загрузки файла
    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0]?.name || null });
    };

    // Проверка формы перед отправкой
    const validateForm = () => {
        let newErrors = {};
        if (!formData.dormitory) newErrors.dormitory = "Выберите общежитие";
        if (!formData.firstName.trim()) newErrors.firstName = "Введите имя";
        if (!formData.lastName.trim()) newErrors.lastName = "Введите фамилию";
        if (!formData.city.trim()) newErrors.city = "Введите город";
        if (!formData.roomType) newErrors.roomType = "Выберите тип комнаты";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Отправка формы
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
            const updatedBookings = [...existingBookings, formData];

            localStorage.setItem("bookings", JSON.stringify(updatedBookings));

            alert("Бронирование успешно!");
            navigate("/my-bookings");
        }
    };

    return (
        <>
            <Header />
            <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Бронирование общежития</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Тип заявки */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Тип заявки</label>
                        <input
                            type="text"
                            value="Общежитие"
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Выберите общежитие *</label>
                        <select
                            name="dormitory"
                            value={formData.dormitory}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.dormitory ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Выберите...</option>
                            <option value="ДС-2А">ДС-2А</option>
                            <option value="ДС-2Б">ДС-2Б</option>
                            <option value="ДС-3">ДС-3</option>
                            <option value="Narxoz Residence">Narxoz Residence</option>
                        </select>
                        {errors.dormitory && <p className="text-[#D50032] text-sm mt-1">{errors.dormitory}</p>}
                    </div>

                    {/* Имя */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Имя *</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Введите имя"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    {/* Фамилияs */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Фамилия *</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Введите фамилию"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>

                    {/* Город */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Город *</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.city ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Введите ваш город"
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    {/* Выбор комнаты */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Выберите тип комнаты *</label>
                        <select
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.roomType ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Выберите...</option>
                            <option value="1 местная">1-местная</option>
                            <option value="2-х местная">2-х местная</option>
                            <option value="3-х местная">3-х местная</option>
                            <option value="4-х местная">4-х местная</option>
                        </select>
                        {errors.roomType && <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>}
                    </div>

                    {/* Кнопка отправки */}
                    <button
                        type="submit"
                        className="w-full bg-[#D50032] text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
                    >
                        Забронировать
                    </button>
                </form>
            </div>
        </>
    );
};

export default Booking;
