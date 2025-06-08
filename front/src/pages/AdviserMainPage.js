import React from "react";
import { Link } from "react-router-dom";
import { FiInfo } from "react-icons/fi";

const advisersData = [
    {
        window: "№ 1, № 2",
        title: "Менеджер фронт офис",
        responsibilities: [
            "Заявление (отчисление, перевод, академ, отпуск)",
            "Справки",
            "Фронт карты"
        ],
        managers: ["Идрисова Жансулу", "Құсайын Мардан"],
        facultyLogo: "/faculty/front.png"
    },
    {
        window: "№ 3",
        title: "Менеджер LMS Canvas Narxoz",
        responsibilities: ["Миграция оценок", "Вопросы по Canvas"],
        managers: ["Нурланов Ильясхан"],
        facultyLogo: "/faculty/front.png"
    },
    {
        window: "№ 4",
        title: "Менеджер по финансовым и социальным вопросам",
        managers: ["Аймаханова Куралай"],
        facultyLogo: "/faculty/front.png"
    },
    {
        window: "№ 5",
        title: "Эдвайзеры",
        advisers: ["Даниал Диана", "Ерниязқызы Диана"],
        specialties: [
            "Digital Engineering",
            "Digital Management and Design",
            "Прикладная математика",
            "Статистика и наука о данных",
            "Социология"
        ],
        facultyLogo: "/faculty/digital.png"
    },
    {
        window: "№ 6",
        title: "Эдвайзер",
        advisers: ["Әбікен Айнур"],
        specialties: [
            "Учет и Аудит",
            "HR и бизнес планирование",
            "Социальная работа",
            "Психологическое консультирование",
            "Менеджмент",
            "Экономика"
        ],
        facultyLogo: "/faculty/economics.png"
    },
    {
        window: "№ 7",
        title: "Эдвайзер",
        advisers: ["Анарбаева Айгерим"],
        specialties: [
            "Кибербезопасность",
            "Финансы",
            "Finance Risk Management",
            "Маркетинг"
        ],
        facultyLogo: "/faculty/marketing.png"
    },
    {
        window: "№ 8 ",
        title: "Эдвайзер",
        advisers: ["Скакова Салтанат"],
        specialties: [
            "Юриспруденция",
            "Международные отношения",
            "Политические массовые коммуникации",
            "Ресторанный и отдельный бизнес",
            "Экология",
            "Государственное и местное управление",
            "Туризм и гостеприимство",
            "Международная и сравнительная политология",
            "Окружающая среда и устойчивое развитие"
        ],
        facultyLogo: "/faculty/law.png"
    }
];

const AdviserMainPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 font-nunito text-[16px] text-neutral-700 antialiased tracking-tight">
            {/* Информационная карточка */}
            <div className="bg-gradient-to-r from-pink-100 to-blue-100 rounded-3xl p-8 shadow-lg mb-12">
                <div className="flex items-center mb-4">
                    <FiInfo className="text-3xl text-[#D50032] mr-3" />
                    <h2 className="text-3xl font-bold text-gray-800">
                        Эдвайзерлік қызмет туралы
                    </h2>
                </div>
                <p className="leading-relaxed font-normal">
                    Эдвайзеры помогают студентам с вопросами по учебе, отпускам, восстановлению,
                    выбору дисциплин и составлению ИУП. Если вы не знаете, к кому обратиться — начните с эдвайзера.
                </p>
                <p className="mt-4 leading-relaxed font-normal">
                    Многие студенты не читают почту и пропускают важные уведомления. Регулярно проверяйте платформу!
                </p>
                {/* Общая кнопка */}
                <div className="mt-12 text-center">
                    <Link
                        to="/advisor-booking"
                        className="inline-block bg-gradient-to-r from-[#D50032] to-pink-600 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        📅 Записаться к эдвайзеру
                    </Link>
                </div>
            </div>

            {/* Карточки эдвайзеров */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {advisersData.map((entry, index) => (
                    <div
                        key={index}
                        className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 min-h-[420px] p-6 flex flex-col justify-between"
                    >
                        {/* Уменьшенное фоновое фото */}
                        {entry.facultyLogo && (
                            <img
                                src={entry.facultyLogo}
                                alt="Faculty Background"
                                className="absolute inset-0 m-auto opacity-10 w-100 h-100 object-contain pointer-events-none select-none"
                                style={{ zIndex: 0 }}
                            />
                        )}

                        {/* Контент */}
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-[#D50032] mb-3">
                                {entry.window} — {entry.title}
                            </h3>

                            {entry.managers && (
                                <p className="mb-2 font-normal">
                                    <strong>Менеджеры:</strong> {entry.managers.join(", ")}
                                </p>
                            )}

                            {entry.advisers && (
                                <p className="mb-2 font-normal">
                                    <strong>Эдвайзеры:</strong> {entry.advisers.join(", ")}
                                </p>
                            )}

                            {entry.responsibilities && (
                                <>
                                    <p className="font-semibold mb-1">Обязанности:</p>
                                    <ul className="list-disc ml-5 mb-2">
                                        {entry.responsibilities.map((r, i) => (
                                            <li key={i} className="font-normal">{r}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {entry.specialties && (
                                <>
                                    <p className="font-semibold mb-1">Специальности:</p>
                                    <ul className="list-disc ml-5">
                                        {entry.specialties.map((s, i) => (
                                            <li key={i} className="font-normal">{s}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AdviserMainPage;
