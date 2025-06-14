import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const generateTimeSlots = () => {
    const startHour = 10;
    const endHour = 17;
    const breakStart = 13;
    const breakEnd = 14;
    const interval = 20;
    const slots = [];

    for (let hour = startHour; hour < breakStart; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
            const h = hour.toString().padStart(2, "0");
            const m = minute.toString().padStart(2, "0");
            slots.push(`${h}:${m}`);
        }
    }

    for (let hour = breakEnd; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
            const h = hour.toString().padStart(2, "0");
            const m = minute.toString().padStart(2, "0");
            slots.push(`${h}:${m}`);
        }
    }

    return slots;
};

const AsmedBookingPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [iin, setIin] = useState("");
    const [reason, setReason] = useState("");
    const [occupiedTimes, setOccupiedTimes] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [slotsVisible, setSlotsVisible] = useState(false);

    const timeSlots = useMemo(() => generateTimeSlots(), []);

    useEffect(() => {
        if (!date) {
            setOccupiedTimes([]);
            setSlotsVisible(false);
            return;
        }

        axios
            .get("http://localhost:8000/api/asmed/occupied", {
                params: { date },
            })
            .then((res) => {
                setOccupiedTimes(res.data);
                setSlotsVisible(true);
            })
            .catch(() => {
                setOccupiedTimes([]);
                setSlotsVisible(true);
            });
    }, [date]);

    const checkExistingBooking = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/asmed/my", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data && res.data.length > 0;
    };

    const handleBooking = async () => {
        if (!date || !time || !reason || !iin) {
            alert(t("asmed.alert_fill_fields"));
            return;
        }

        // Валидация ИИН
        const iinRegex = /^\d{12}$/;
        if (!iinRegex.test(iin)) {
            alert(t("asmed.alert_invalid_iin"));
            return;
        }

        const already = await checkExistingBooking();
        if (already) {
            alert(t("asmed.alert_already_booked"));
            return;
        }

        setShowConfirm(true);
    };

    const confirmBooking = async () => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:8000/api/asmed/book",
                {
                    date,
                    time,
                    reason,
                    iin,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(t("asmed.alert_success"));
            navigate("/my-bookings");
        } catch (err) {
            console.error("Ошибка при записи в медпункт", err);
            alert(t("asmed.alert_error"));
        } finally {
            setSubmitting(false);
            setShowConfirm(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-2">{t("asmed.title")}</h1>
            <p className="text-center text-gray-500 mb-6">{t("asmed.subtitle")}</p>
            <label className="block font-medium mb-1">{t("asmed.iin_label") || "ИИН"}</label>
            <input
                type="number"
                value={iin}
                onChange={(e) => setIin(e.target.value)}
                maxLength={12}
                className="w-full border px-4 py-2 rounded-lg mb-6"
                placeholder={t("asmed.iin_placeholder") || "Введите ИИН"}
            />

            <label className="block font-medium mb-1">{t("asmed.date")}</label>
            <input
                type="date"
                value={date}
                onChange={(e) => {
                    setDate(e.target.value);
                    setTime("");
                }}
                className="w-full border px-4 py-2 rounded-lg mb-6"
            />

            {slotsVisible && (
                <>
                    <label className="block font-medium mb-1">{t("asmed.time")}</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
                        {timeSlots.map((slot) => (
                            <button
                                key={slot}
                                onClick={() => setTime(slot)}
                                disabled={occupiedTimes.includes(slot)}
                                className={`px-3 py-2 rounded-lg text-sm ${
                                    occupiedTimes.includes(slot)
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : time === slot
                                            ? "bg-red-600 text-white"
                                            : "bg-gray-100"
                                }`}
                            >
                                {slot} {occupiedTimes.includes(slot) && `(${t("asmed.occupied")})`}
                            </button>
                        ))}
                    </div>
                </>
            )}


            <label className="block font-medium mb-1">{t("asmed.reason")}</label>
            <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg mb-6"
                placeholder={t("asmed.reason_placeholder")}
                rows={4}
            />

            <button
                onClick={handleBooking}
                disabled={submitting}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
            >
                {submitting ? t("asmed.submitting") : t("asmed.book")}
            </button>

            {showConfirm && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                    <p className="text-lg font-semibold mb-2">{t("asmed.confirm_title")}</p>
                    <p>{date} | {time}</p>
                    <div className="mt-3 flex justify-center gap-4">
                        <button
                            onClick={confirmBooking}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg"
                            disabled={submitting}
                        >
                            {t("asmed.yes")}
                        </button>
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="bg-gray-400 text-white px-6 py-2 rounded-lg"
                        >
                            {t("asmed.no")}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AsmedBookingPage;
