import React, { useEffect, useState, useContext, useMemo } from "react";
import { motion } from "framer-motion";
import {
    FaHome,
    FaUser,
    FaCheckCircle,
    FaHeartbeat,
} from "react-icons/fa";
import api from "../utils/api";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import PaymentModal from "../components/PaymentModal";
import { useTranslation } from "react-i18next";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [filter, setFilter] = useState("all");
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const [dormRes, advisorRes, asmedRes] = await Promise.all([
                    api.get("/my-bookings", { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] })),
                    api.get("/advisor-bookings/my", { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] })),
                    api.get("/asmed/my", { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] })),
                ]);

                const dormBookings = dormRes.data.map((item) => ({
                    applicationType: t("myBookings.filters.dormitory"),
                    dormitory: item.room?.dormitory?.name || "—",
                    roomType: item.room?.room_number || "—",
                    file: item.attached_files?.length > 0,
                    id: item.id,
                    status: item.status,
                    payment_status: item.payment_status,
                    contract_signed: item.contract_signed,
                }));

                const advisorBookings = advisorRes.data.map((item) => ({
                    applicationType: t("myBookings.filters.advisor"),
                    id: item.id,
                    date: item.date,
                    time: item.time,
                    school: item.school,
                    faculty: item.faculty,
                    description: item.description,
                    status: item.status,
                }));

                const asmedBookings = asmedRes.data.map((item) => ({
                    applicationType: t("myBookings.filters.asmed"),
                    id: item.id,
                    date: item.date,
                    time: item.time,
                    reason: item.reason,
                }));

                setBookings([...dormBookings, ...advisorBookings, ...asmedBookings]);
            } catch (error) {
                console.error("Ошибка при загрузке бронирований:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchData();
    }, [user, t]);

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
            alert("Ошибка при оплате. Попробуйте снова.");
        }
    };

    const handleSignContract = async (bookingId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(`http://localhost:8000/api/bookings/${bookingId}/sign`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            setBookings((prev) =>
                prev.map((b) =>
                    b.id === bookingId ? { ...b, contract_signed: true } : b
                )
            );
        } catch (e) {
            console.error("Ошибка при подписании договора", e);
            alert("Ошибка при подписании. Попробуйте снова.");
        }
    };

    const filteredBookings = useMemo(() => {
        if (filter === "all") return bookings;
        return bookings.filter((b) => b.applicationType === t(`myBookings.filters.${filter}`));
    }, [bookings, filter, t]);

    if (loading) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl text-gray-600">{t("myBookings.loading")}</h1>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4 font-sans text-center">
            <h1 className="text-4xl font-extrabold text-[#D50032] mb-8">{t("myBookings.title")}</h1>

            <div className="flex justify-center gap-3 flex-wrap mb-6">
                {["all", "dormitory", "advisor", "asmed"].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-full border ${
                            filter === type ? "bg-[#D50032] text-white" : "bg-white text-gray-700"
                        }`}
                    >
                        {t(`myBookings.filters.${type}`)}
                    </button>
                ))}
            </div>

            {filteredBookings.length === 0 ? (
                <p className="text-gray-500">{t("myBookings.noBookings")}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {filteredBookings.map((b, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-5 border bg-white shadow rounded-xl text-left"
                        >
                            <div className="flex items-center gap-2 text-lg font-semibold mb-3">
                                {b.applicationType === t("myBookings.filters.dormitory") && <FaHome className="text-[#D50032]" />}
                                {b.applicationType === t("myBookings.filters.advisor") && <FaUser className="text-[#D50032]" />}
                                {b.applicationType === t("myBookings.filters.asmed") && <FaHeartbeat className="text-[#D50032]" />}
                                {b.applicationType}
                            </div>

                            <div className="text-sm text-gray-700 space-y-1">
                                {b.applicationType === t("myBookings.filters.dormitory") && (
                                    <>
                                        <p><strong>{t("myBookings.labels.dormitory")}:</strong> {b.dormitory}</p>
                                        <p><strong>{t("myBookings.labels.room")}:</strong> {b.roomType}</p>
                                        <p><strong>{t("myBookings.labels.file")}:</strong> {b.file ? "✓" : "—"}</p>
                                        <div className="mt-4">
                                            {b.status === "pending" && (
                                                <p className="text-yellow-600 font-semibold">{t("myBookings.status.pending")}</p>
                                            )}
                                            {b.status === "approved" && (
                                                <>
                                                    <p className="text-green-600 font-semibold mb-2">{t("myBookings.status.approved")}</p>
                                                    {b.payment_status !== "paid" ? (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedBookingId(b.id);
                                                                setShowModal(true);
                                                            }}
                                                            className="bg-[#D50032] text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                                                        >
                                                            {t("myBookings.pay")}
                                                        </button>
                                                    ) : !b.contract_signed ? (
                                                        <div className="mt-4 bg-gray-50 border p-4 rounded-xl">
                                                            <h4 className="font-bold mb-2 text-[#D50032]">{t("myBookings.contract.title")}</h4>
                                                            <p className="text-sm text-gray-600 mb-4">
                                                                {t("myBookings.contract.description")}
                                                            </p>
                                                            <button
                                                                onClick={() => handleSignContract(b.id)}
                                                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                                            >
                                                                {t("myBookings.contract.accept")}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-green-700 font-medium mt-2 flex items-center gap-2">
                                                            <FaCheckCircle className="text-green-600"/> {t("myBookings.contract.signed")}
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                            {b.status === "rejected" && (
                                                <p className="text-red-600 font-semibold">{t("myBookings.status.rejected")}</p>
                                            )}
                                        </div>
                                    </>
                                )}

                                {b.applicationType === t("myBookings.filters.advisor") && (
                                    <>
                                        <p><strong>{t("myBookings.labels.date")}:</strong> {b.date}</p>
                                        <p><strong>{t("myBookings.labels.time")}:</strong> {b.time}</p>
                                        <p><strong>{t("myBookings.labels.school")}:</strong> {b.school}</p>
                                        <p><strong>{t("myBookings.labels.faculty")}:</strong> {b.faculty}</p>
                                    </>
                                )}

                                {b.applicationType === t("myBookings.filters.asmed") && (
                                    <>
                                        <p><strong>{t("myBookings.labels.date")}:</strong> {b.date}</p>
                                        <p><strong>{t("myBookings.labels.time")}:</strong> {b.time}</p>
                                        <p><strong>{t("myBookings.labels.reason")}:</strong> {b.reason}</p>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
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
