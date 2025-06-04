import React, { useEffect, useState } from "react";
import api from "../utils/api";
import PageWrapper from "./PageWrapper";
import { motion } from "framer-motion";
import { FaLock, FaBed, FaBuilding } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const RoomGrid = ({ dormitory, onSelectRoom }) => {
    const { t } = useTranslation();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFloor, setSelectedFloor] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await api.get(`/dormitories/${dormitory.id}/rooms`);
                setRooms(response.data);
            } catch (err) {
                console.error("Ошибка загрузки комнат", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [dormitory]);

    const filteredRooms = selectedFloor
        ? rooms.filter((room) => room.floor === selectedFloor)
        : rooms;

    const floors = Array.from(new Set(rooms.map((room) => room.floor))).sort((a, b) => a - b);

    if (loading) return <p className="text-center text-gray-500">{t("roomGrid.loading")}</p>;

    return (
        <PageWrapper>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    {t("roomGrid.title", { dormitory: dormitory.name })}
                </h2>

                {/* Фильтр по этажам */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <button
                        className={`px-4 py-2 rounded-full text-sm font-medium border ${
                            selectedFloor === null
                                ? "bg-[#D50032] text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedFloor(null)}
                    >
                        {t("roomGrid.allFloors")}
                    </button>
                    {floors.map((floor) => (
                        <button
                            key={floor}
                            className={`px-4 py-2 rounded-full text-sm font-medium border ${
                                selectedFloor === floor
                                    ? "bg-[#D50032] text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => setSelectedFloor(floor)}
                        >
                            {t("roomGrid.floor")} {floor}
                        </button>
                    ))}
                </div>

                {/* Карточки комнат */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredRooms.map((room, index) => (
                        <motion.div
                            key={room.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => !room.occupied && onSelectRoom(room)}
                            className={`cursor-pointer p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
                                ${!room.occupied ? "bg-white hover:border-[#D50032]" : "bg-gray-100 opacity-60 pointer-events-none"}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-extrabold text-gray-800">
                                    {t("roomGrid.room")} {room.room_number}
                                </h3>
                                {!room.occupied ? (
                                    <FaBed className="text-green-500 text-lg" title={t("roomGrid.available")} />
                                ) : (
                                    <FaLock className="text-gray-400 text-lg" title={t("roomGrid.occupied")} />
                                )}
                            </div>

                            {/* 💸 Цена */}
                            <p className="text-lg text-[#D50032] font-semibold mb-2">
                                {room.price?.toLocaleString()} тг / {t("roomGrid.month")}
                            </p>

                            {/* 👥 Вместимость */}
                            <p className="text-sm text-gray-600 mb-1">
                                {t("roomGrid.capacity")}: <strong>{room.capacity}</strong>
                            </p>

                            {/* 🏢 Этаж */}
                            <div className="flex items-center text-sm text-gray-500 gap-2 mb-3">
                                <FaBuilding className="text-[#D50032]" />
                                <span className="font-medium">
                                    {t("roomGrid.floor")}: {room.floor}
                                </span>
                            </div>

                            {/* 🟢 Статус */}
                            <div
                                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
                                    ${!room.occupied ? "bg-green-100 text-green-700" : "bg-gray-300 text-gray-700"}`}
                            >
                                {!room.occupied ? t("roomGrid.available") : t("roomGrid.occupied")}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
};

export default RoomGrid;
