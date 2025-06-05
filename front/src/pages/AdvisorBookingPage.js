import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

// Time slots: каждые 20 минут, без 13:00–14:00
const generateTimeSlots = () => {
    const slots = [];
    for (let h = 10; h <= 16; h++) {
        for (let m of [0, 20, 40]) {
            if (h === 13) continue;
            if (h === 16 && m > 30) continue;
            slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
        }
    }
    return slots;
};

const timeSlots = generateTimeSlots();

const schools = {
    "Школа Цифровых Технологий": [
        "Digital Engineering",
        "Digital Management and Design",
        "Прикладная математика",
        "Статистика и наука о данных",
        "Кибербезопасность",
    ],
    "Школа Экономики и Менеджмента": [
        "Учет и Аудит",
        "HR и бизнес планирование",
        "Менеджмент",
        "Экономика",
        "Финансы",
        "Finance risk Management",
        "Маркетинг",
    ],
    "Школа Права и Государственного Управления": [
        "Юриспруденция",
        "Международные отношения",
        "Политические массовые коммуникации",
        "Государственное и местное управление",
    ],
    "Гуманитарная Школа": [
        "Социология",
        "Социальная работа",
        "Психологическое консультирование",
        "Экология",
        "Туризм и гостеприимство",
        "Окружающая среда и устойчивое развитие",
    ],
};

const reasons = [
    "Проблема с регистрацией",
    "Изменение учебного плана",
    "Перевод, отчисление",
    "Консультация по предметам",
    "Другая причина",
];

const schema = yup.object().shape({
    date: yup.string().required("Выберите дату"),
    school: yup.string().required("Выберите школу"),
    faculty: yup.string().required("Выберите специальность"),
    time: yup.string().required("Выберите время"),
    reason: yup.string().required("Укажите причину"),
    description: yup.string().when("reason", {
        is: "Другая причина",
        then: schema => schema.required("Опишите свой вопрос"),
    }),
});

export default function AdvisorBookingPage() {
    const navigate = useNavigate();
    const [occupied, setOccupied] = useState([]);
    const [alreadyBooked, setAlreadyBooked] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            date: "",
            school: "",
            faculty: "",
            time: "",
            reason: "",
            description: "",
        },
        resolver: yupResolver(schema),
    });

    const watchDate = watch("date");
    const watchSchool = watch("school");
    const watchReason = watch("reason");

    useEffect(() => {
        if (!watchDate) return;
        axios
            .get("http://localhost:8000/api/advisor-bookings/occupied", {
                params: { date: watchDate },
            })
            .then((res) => setOccupied(res.data))
            .catch(() => setOccupied([]));
    }, [watchDate]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:8000/api/advisor-bookings/my", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                if (res.data.length > 0) {
                    setAlreadyBooked(true);
                }
            })
            .catch(() => setAlreadyBooked(false));
    }, []);

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8000/api/advisor-bookings", data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Вы успешно записались к эдвайзеру!");
            navigate("/my-bookings");
        } catch (err) {
            console.error(err);
            alert("Ошибка при отправке. Повторите попытку.");
        }
    };

    if (alreadyBooked) {
        return (
            <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-xl shadow">
                <h1 className="text-2xl font-bold text-center mb-4">Запись к эдвайзеру</h1>
                <p className="text-center text-red-600 text-lg">
                    Вы уже записались к эдвайзеру. Повторная запись невозможна.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10 transition-all">
            <h1 className="text-3xl font-bold text-center mb-4">Запись к эдвайзеру</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Дата */}
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <>
                            <label>Дата</label>
                            <input type="date" {...field} className="input-style" />
                            {errors.date && <p className="error">{errors.date.message}</p>}
                        </>
                    )}
                />

                {/* Школа */}
                <Controller
                    name="school"
                    control={control}
                    render={({ field }) => (
                        <>
                            <label>Школа</label>
                            <select
                                {...field}
                                className="input-style"
                                onChange={(e) => {
                                    field.onChange(e);
                                    setValue("faculty", "");
                                }}
                            >
                                <option value="">Выберите школу</option>
                                {Object.keys(schools).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                            {errors.school && <p className="error">{errors.school.message}</p>}
                        </>
                    )}
                />

                {/* Специальность */}
                <Controller
                    name="faculty"
                    control={control}
                    render={({ field }) => (
                        <>
                            <label>Специальность</label>
                            <select {...field} className="input-style" disabled={!watchSchool}>
                                <option value="">Выберите специальность</option>
                                {schools[watchSchool]?.map((f) => (
                                    <option key={f} value={f}>
                                        {f}
                                    </option>
                                ))}
                            </select>
                            {errors.faculty && <p className="error">{errors.faculty.message}</p>}
                        </>
                    )}
                />

                {/* Время */}
                <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                        <>
                            <label>Время</label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {timeSlots.map((slot) => (
                                    <button
                                        type="button"
                                        key={slot}
                                        onClick={() => field.onChange(slot)}
                                        disabled={occupied.includes(slot)}
                                        className={`px-3 py-1 rounded text-sm transition ${
                                            field.value === slot
                                                ? "bg-red-600 text-white"
                                                : "bg-gray-200"
                                        } ${occupied.includes(slot) ? "opacity-50" : "hover:bg-red-100"}`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                            {errors.time && <p className="error">{errors.time.message}</p>}
                        </>
                    )}
                />

                {/* Причина */}
                <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                        <>
                            <label>Причина</label>
                            <select {...field} className="input-style">
                                <option value="">Выберите причину</option>
                                {reasons.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                            {errors.reason && <p className="error">{errors.reason.message}</p>}
                        </>
                    )}
                />

                {/* Описание (если выбрана "другая причина") */}
                <AnimatePresence>
                    {watchReason === "Другая причина" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <label>Описание</label>
                                        <textarea
                                            {...field}
                                            rows={4}
                                            className="input-style"
                                            placeholder="Опишите ваш вопрос"
                                        />
                                        {errors.description && <p className="error">{errors.description.message}</p>}
                                    </>
                                )}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-lg transition"
                >
                    Записаться
                </button>
            </form>
        </div>
    );
}

// Tailwind helper styles
const style = document.createElement("style");
style.innerHTML = `
  .input-style {
    width: 100%;
    border: 1px solid #ccc;
    padding: 8px 12px;
    border-radius: 10px;
    outline: none;
    transition: border 0.2s;
  }
  .input-style:focus {
    border-color: #ef4444;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
  }
  .error {
    color: #e11d48;
    font-size: 0.875rem;
    margin-top: 2px;
  }
`;
document.head.appendChild(style);
