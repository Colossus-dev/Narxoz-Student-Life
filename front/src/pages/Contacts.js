import React from "react";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaFax } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ContactCard = ({ title, phone, email, extraPhone, whatsapp }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col justify-center items-center h-[260px] text-center
            transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="space-y-3 text-base text-gray-800 leading-relaxed flex flex-col items-center justify-center flex-1">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>

                {phone && (
                    <div className="flex items-center gap-2 text-[#D50032]">
                        <FaFax size={18} />
                        <span>{phone}</span>
                    </div>
                )}

                {extraPhone && (
                    <div className="flex items-center gap-2 text-[#D50032]">
                        <FaPhoneAlt size={18} />
                        <span>{extraPhone}</span>
                    </div>
                )}

                {email && (
                    <div className="flex items-center gap-2 text-[#D50032]">
                        <FaEnvelope size={18} />
                        <a href={`mailto:${email}`} className="underline font-medium">{email}</a>
                    </div>
                )}
            </div>

            {whatsapp && (
                <div className="mt-4">
                    <a
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md font-semibold transition"
                    >
                        {t("contacts.writeOnWhatsapp")}
                    </a>
                </div>
            )}
        </div>
    );
};

const facultyContacts = [
    {
        titleKey: "contacts.humanitarianSchool",
        email: "anel.kulakhmetova@narxoz.kz",
    },
    {
        titleKey: "contacts.lawSchool",
        email: "slpp@narxoz.kz",
    },
    {
        titleKey: "contacts.economySchool",
        email: "dilbar.gimranova@narxoz.kz",
    },
    {
        titleKey: "contacts.digitalSchool",
        email: "rasim.suliyev@narxoz.kz",
    },
];

const Contacts = () => {
    const { t } = useTranslation();

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
                {t("contacts.title")}
            </h1>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-2xl font-semibold text-[#D50032] mb-6">
                        {t("contacts.students")}
                    </h2>
                    <div className="space-y-6 w-full">
                        <ContactCard
                            title={t("contacts.studentServiceCenter")}
                            phone="+7 (727) 377 11 11"
                            email="front-office@narxoz.kz"
                        />
                        <ContactCard
                            title={t("contacts.office")}
                            phone="+7 (727) 377 12 55"
                            email="narxoz@narxoz.kz"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center text-center">
                    <h2 className="text-2xl font-semibold text-[#D50032] mb-6">
                        {t("contacts.applicants")}
                    </h2>
                    <div className="space-y-6 w-full">
                        <ContactCard
                            title={t("contacts.admission")}
                            phone="+7 (727) 377 11 11"
                            extraPhone="+7 (747) 364 88 99"
                            email="admission@narxoz.kz"
                            whatsapp="77473648899"
                        />
                        <ContactCard
                            title={t("contacts.militaryDepartment")}
                            phone="+7 (707) 998 28 98"
                            email="vk@narxoz.kz"
                        />
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-center text-[#D50032] mb-6">
                    {t("contacts.faculties")}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {facultyContacts.map((faculty, index) => (
                        <ContactCard
                            key={index}
                            title={t(faculty.titleKey)}
                            email={faculty.email}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contacts;
