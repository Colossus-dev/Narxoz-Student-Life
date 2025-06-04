import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const PaymentModal = ({ isOpen, onClose, onConfirm }) => {
    const { t } = useTranslation();

    const [cardNumber, setCardNumber] = useState("");
    const [name, setName] = useState("");
    const [exp, setExp] = useState("");
    const [cvc, setCvc] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cardNumber && name && exp && cvc) {
            onConfirm();
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <h2 className="text-xl font-bold mb-4">
                            💳 {t("paymentModal.title")}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder={t("paymentModal.cardNumber")}
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder={t("paymentModal.cardHolder")}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder={t("paymentModal.expiry")}
                                    value={exp}
                                    onChange={(e) => setExp(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder={t("paymentModal.cvc")}
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 border rounded hover:bg-gray-100"
                                >
                                    {t("paymentModal.cancel")}
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#D50032] text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    {t("paymentModal.pay")}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;
