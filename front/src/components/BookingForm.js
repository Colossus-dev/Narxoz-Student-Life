import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FaFileUpload, FaTimes } from "react-icons/fa";

const BookingForm = ({ dormitory, room }) => {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        city: "",
        privileges: "",
        file: null,
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
        setFormData({ ...formData, file });
    };

    const removeFile = () => {
        setFormData({ ...formData, file: null });
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
            if (formData.file) {
                form.append("attached_files", formData.file);
            }

            await axios.post("http://localhost:8000/api/booking-requests", form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            });

            setSuccess("🎉 Заявка успешно отправлена!");
            setFormData({ city: "", privileges: "", file: null });
        } catch (err) {
            console.error(err);
            setError("❌ Ошибка при отправке заявки.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Форма бронирования</h2>
            <p className="text-sm text-gray-600 mb-6">
                <strong>Общежитие:</strong> {dormitory.name}, <strong>Комната:</strong> {room.room_number}
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
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Город *</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="Например: Алматы"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D50032] focus:outline-none transition"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Льготы (если есть)
                    </label>
                    <input
                        type="text"
                        name="privileges"
                        value={formData.privileges}
                        onChange={handleChange}
                        placeholder="Многодетная семья, инвалидность и т.д."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D50032] focus:outline-none transition"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                        <FaFileUpload /> Прикрепить документ (PDF/JPG/PNG)
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#D50032] file:text-white hover:file:bg-red-700 transition"
                    />
                    {formData.file && (
                        <div className="mt-2 flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md shadow-sm">
                            <span className="text-sm text-gray-700 truncate">{formData.file.name}</span>
                            <button
                                type="button"
                                onClick={removeFile}
                                className="text-red-500 hover:text-red-700 transition"
                                title="Удалить файл"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#D50032] text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-red-700 transition"
                >
                    {loading ? "⏳ Отправка..." : " Отправить заявку"}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
