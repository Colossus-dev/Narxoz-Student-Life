import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FaFileUpload, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const BookingForm = ({ dormitory, room }) => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        city: "",
        privileges: "",
        attached_files: null,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, attached_files: file });
    };

    const removeFile = () => {
        setFormData({ ...formData, attached_files: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            const form = new FormData();

            form.append("user_id", user.id);
            form.append("room_id", room.id);
            form.append("city", formData.city);
            form.append("privileges", formData.privileges);
            if (formData.privileges && formData.privileges !== "Басқа" && formData.attached_files) {
                form.append("attached_files", formData.attached_files);
            }

            await axios.post("http://localhost:8000/api/booking-requests", form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            });

            setSuccess(t("bookingForm.success"));
            toast.success(t("bookingForm.success"));
            setFormData({ city: "", privileges: "", attached_files: null });
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 409) {
                toast.error(t("bookingForm.alerts.alreadySubmitted"));
            } else {
                toast.error(t("bookingForm.alerts.error"));
            }
            setError(t("bookingForm.alerts.error"));
        } finally {
            setLoading(false);
        }
    };

    const groupedCities = {
        "Алматы облысы": ["Алматы", "Қонаев", "Талғар", "Текелі", "Талдықорған", "Ұштөбе", "Үшарал"],
        "Астана / Ақмола": ["Астана", "Көкшетау", "Щучинск", "Степногорск", "Ерейментау", "Есіл", "Макинск"],
        "Шымкент / Түркістан": ["Шымкент", "Түркістан", "Сарыағаш", "Кентау", "Арыс", "Жетісай", "Шардара"],
        "Қарағанды облысы": ["Қарағанды", "Теміртау", "Сарань", "Балқаш", "Шахтинск", "Жезқазған"],
        "Басқа қалалар": [
            "Ақтау", "Ақтөбе", "Орал", "Өскемен", "Павлодар", "Семей", "Қызылорда", "Қостанай",
            "Рудный", "Тараз", "Атырау", "Экибастуз", "Қаскелең", "Абай", "Форт-Шевченко", "Құлсары"
        ],
    };

    const privilegesOptions = [
        "Жетім", "Мүгедек", "Көпбалалы отбасы", "Әлеуметтік жағдайы төмен", "Нет"
    ];

    return (
        <div className="mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {t("bookingForm.title")}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
                <strong>{t("bookingForm.dormitory")}:</strong> {dormitory.name},{" "}
                <strong>{t("bookingForm.room")}:</strong> {room.room_number}
            </p>

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm">
                    {success}
                </div>
            )}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* City Dropdown */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        {t("bookingForm.city")} *
                    </label>
                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D50032] transition duration-300"
                    >
                        {Object.entries(groupedCities).map(([region, cities]) => (
                            <optgroup key={region} label={region}>
                                {cities.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>

                {/* Privileges Dropdown */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        {t("bookingForm.privileges")}
                    </label>
                    <select
                        name="privileges"
                        value={formData.privileges}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D50032] transition duration-300"
                    >
                        {privilegesOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* File Upload — only if privilege is selected AND not "Басқа" */}
                {formData.privileges && formData.privileges !== "Нет" && (
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                            <FaFileUpload /> {t("bookingForm.uploadLabel")}
                        </label>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-[#D50032] file:text-white hover:file:bg-red-700 transition duration-300"
                            required
                        />
                        {formData.attached_files && (
                            <div className="mt-2 flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md shadow-sm">
                                <span className="text-sm text-gray-700 truncate">{formData.attached_files.name}</span>
                                <button
                                    type="button"
                                    onClick={removeFile}
                                    className="text-red-500 hover:text-red-700 transition"
                                    title={t("bookingForm.removeFile")}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#D50032] text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-red-700 transition duration-300"
                >
                    {loading ? "⏳ " + t("bookingForm.loading") : t("bookingForm.submit")}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
