import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OrderSuccess = () => {
    const { t } = useTranslation();

    return (
        <div className="max-w-xl mx-auto mt-20 p-8 bg-green-100 text-center shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-green-700 mb-4">
                {t("order_success.title")}
            </h1>
            <p className="text-lg text-gray-800 mb-6">
                {t("order_success.message")}
            </p>
            <Link
                to="/shop"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
                {t("order_success.back_to_shop")}
            </Link>
        </div>
    );
};

export default OrderSuccess;
