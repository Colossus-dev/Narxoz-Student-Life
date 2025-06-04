import React, { useEffect, useState } from "react";
import api from "../utils/api";
import PageWrapper from "./PageWrapper";
import { motion } from "framer-motion";
import { FaUniversity } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DormitorySelector = ({ onSelectDormitory }) => {
    const { t } = useTranslation();
    const [dormitories, setDormitories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchDormitories = async () => {
            try {
                const response = await api.get("/dormitories");
                setDormitories(response.data);
            } catch (err) {
                console.error("Ошибка загрузки общежитий", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDormitories();
    }, []);

    const handleSelect = (dorm) => {
        setSelectedId(dorm.id);
        onSelectDormitory(dorm);
    };

    if (loading) return <p className="text-center text-gray-500">{t("dormitorySelector.loading")}</p>;

    return (
        <PageWrapper>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {t("dormitorySelector.title")}
            </h2>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {dormitories.map((dorm, index) => (
                        <motion.div
                            key={dorm.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleSelect(dorm)}
                            className={`relative cursor-pointer overflow-hidden rounded-2xl border shadow-sm hover:shadow-xl transform transition hover:-translate-y-1 group
                            ${dorm.id === selectedId ? "ring-2 ring-[#D50032]" : ""}`}
                        >
                            <div className="h-40 w-full bg-gray-200">
                                {dorm.image ? (
                                    <img
                                        src={`http://localhost:8000/storage/${dorm.image}`}
                                        alt={dorm.name}
                                        className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-400">
                                        <FaUniversity size={48} />
                                    </div>
                                )}
                            </div>

                            <div className="absolute bottom-0 w-full bg-black/50 text-white px-4 py-3">
                                <h3 className="text-lg font-bold">{dorm.name}</h3>
                                <p className="text-sm">
                                    {t("dormitorySelector.roomsCount")}: {dorm.rooms_count}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
};

export default DormitorySelector;
