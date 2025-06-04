import React from "react";
import { MdPerson, MdSupervisorAccount } from "react-icons/md";

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
        office: "A корпус, 101 кабинет",
        contact: "frontoffice@narxoz.kz",
        workTime: "Пн–Пт, 09:00–18:00"
    },
    {
        window: "№ 3",
        title: "Менеджер LMS Canvas Narxoz",
        responsibilities: ["Миграция оценок", "Вопросы по Canvas"],
        managers: ["Нурланов Ильясхан"],
        office: "A корпус, 102 кабинет",
        contact: "canvas@narxoz.kz",
        workTime: "Пн–Пт, 09:00–17:30"
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
        office: "B корпус, 205 кабинет",
        contact: "dean5@narxoz.kz",
        workTime: "Пн–Пт, 10:00–17:00"
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
        office: "B корпус, 206 кабинет",
        contact: "adviser6@narxoz.kz",
        workTime: "Пн–Пт, 10:00–17:00"
    },
    {
        window: "№ 7",
        title: "Менеджер по финансовым и социальным вопросам",
        managers: ["Аймаханова Куралай"],
        office: "A корпус, 103 кабинет",
        contact: "finance@narxoz.kz",
        workTime: "Пн–Пт, 09:00–18:00"
    },
    {
        window: "№ 8",
        title: "Эдвайзер",
        advisers: ["Анарбаева Айгерим"],
        specialties: [
            "Кибербезопасность",
            "Финансы",
            "Finance Risk Management",
            "Маркетинг"
        ],
        office: "B корпус, 208 кабинет",
        contact: "adviser8@narxoz.kz",
        workTime: "Пн–Пт, 10:00–17:00"
    },
    {
        window: "№ 9",
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
        office: "B корпус, 209 кабинет",
        contact: "adviser9@narxoz.kz",
        workTime: "Пн–Пт, 10:00–17:00"
    }
];

const AdviserMainPage = () => {
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Служба эдвайзеров</h1>

            <div className="mb-12 text-lg leading-relaxed text-gray-700 bg-blue-50 p-6 rounded-lg shadow">
                <p>
                    Эдвайзеры помогают студентам с вопросами, связанными с учебным процессом, переводом, академическим отпуском, восстановлением, выбором предметов и составлением индивидуального учебного плана. Они — первые, к кому обращаются студенты при возникновении трудностей или неясностей.
                </p>
                <p className="mt-4">
                    Частые проблемы: студенты не проверяют почту или платформу, из-за чего пропускают важные уведомления. Мы рекомендуем регулярно следить за новостями и напоминаниями от эдвайзеров.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {advisersData.map((entry, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
                        <h2 className="text-xl font-semibold text-red-600 mb-1">Окно {entry.window}</h2>
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            {entry.title.includes("Менеджер") ? (
                                <MdSupervisorAccount className="text-gray-500" />
                            ) : (
                                <MdPerson className="text-gray-500" />
                            )}
                            {entry.title}
                        </h3>

                        {entry.managers && (
                            <p className="text-gray-700 mb-1">Менеджеры: {entry.managers.join(", ")}</p>
                        )}
                        {entry.advisers && (
                            <p className="text-gray-700 mb-1">Эдвайзеры: {entry.advisers.join(", ")}</p>
                        )}

                        {entry.office && (
                            <p className="text-gray-600">Кабинет: {entry.office}</p>
                        )}
                        {entry.workTime && (
                            <p className="text-gray-600">График: {entry.workTime}</p>
                        )}
                        {entry.contact && (
                            <p className="text-gray-600 mb-2">Email: {entry.contact}</p>
                        )}

                        {entry.responsibilities && (
                            <ul className="list-disc ml-5 text-gray-700 mb-2">
                                {entry.responsibilities.map((r, i) => (
                                    <li key={i}>{r}</li>
                                ))}
                            </ul>
                        )}
                        {entry.specialties && (
                            <>
                                <p className="mt-2 font-semibold">Специальности:</p>
                                <ul className="list-disc ml-5 text-gray-700">
                                    {entry.specialties.map((s, i) => (
                                        <li key={i}>{s}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-16 bg-yellow-50 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center text-yellow-800 mb-4">Часто задаваемые вопросы</h2>
                <ul className="list-disc text-gray-700 ml-6 space-y-2">
                    <li>Как подать заявление на академический отпуск?</li>
                    <li>Кто помогает с восстановлением после отчисления?</li>
                    <li>Где получить справку для военкомата?</li>
                    <li>К кому обращаться по вопросам Canvas LMS?</li>
                </ul>
            </div>

            {/* Call to Action */}
            <div className="mt-10 text-center bg-green-50 p-4 rounded-lg shadow">
                <p className="text-lg font-semibold text-green-800">
                    Возникли вопросы? Обратитесь к своему эдвайзеру лично или напишите на корпоративную почту!
                </p>
            </div>
        </div>
    );
};

export default AdviserMainPage;
