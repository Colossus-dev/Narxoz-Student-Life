import React, { useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../context/AuthContext";
import PageWrapper from "../components/PageWrapper";
import FadeInOnScroll from "../components/FadeInOnScroll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
    const { user, loading } = useAuth();
    const [openIndex, setOpenIndex] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phone: "",
        message: "",
    });

    if (loading) return <p className="text-center mt-10 text-lg">Загрузка...</p>;

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await axios.post("http://localhost:8000/api/feedback/submit", formData);
            toast.success("Успешно отправлено!");
            setFormData({ name: "", surname: "", phone: "", message: "" });
        } catch (error) {
            toast.error("Ошибка при отправке. Попробуйте позже.");
        } finally {
            setSubmitting(false);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        pauseOnFocus: false,
        arrows: false,
    };

    const slideImages = ["/slide1.png", "/slide2.png", "/slide3.png"];

    const contentData = [
        {
            image: "/dorm1.png",
            title: "Общежития",
            link: "/booking",
            text: "В Нархоз Университете предоставляются комфортные общежития с современными условиями проживания...",
        },
        {
            image: "/sd.jpeg",
            title: "Запись к Эдвайзеру",
            link: "/advisor-booking",
            text: "Записывайся к Эдвайзеру своей Школы, чтобы найти ответ.",
        },
        {
            image: "/admed.jpg",
            title: "Запись к Asmed",
            link: "/asmed-booking",
            text: "Записывайся к Asmed.",
        },
        {
            image: "/barber.png",
            title: "Narxoz Barbershop",
            link: "/barbershop",
            text: "Narxoz Barbershop — это стильное и уютное место на территории университета...",
        },
        {
            image: "/shop.png",
            title: "Narxoz Shop",
            link: "/shop",
            text: "Narxoz Shop — официальный магазин с брендированной продукцией университета...",
        },
    ];

    const faqData = [
        {
            question: "Университетке түсу үшін қандай талаптар бар?",
            answer: "Университетке түсу үшін талаптар қатарына ҰБТ нәтижелері...",
        },
        {
            question: "Университет шетелдік студенттерге қандай қолдау көрсетеді?",
            answer: "Шетелдік студенттер үшін арнайы поддержка қызметтері...",
        },
        {
            question: "Barbershop-қа төлем қалай жүзеге асады?",
            answer: "Сайтта бронь жасап, қолма-қол төлем жасайсыз.",
        },
        {
            question: "Киім сәйкес келмесе, ауыстыру немесе қайтаруға бола ма?",
            answer: "Қайтару немесе ауыстыру қарастырылмаған.",
        },
    ];

    return (
        <PageWrapper>
            <ToastContainer position="top-right" autoClose={4000} />
            <h1 className="text-3xl font-bold text-[#D50032] mb-10 font-montserrat">
                Добро пожаловать, {user?.name}
            </h1>

            {/* Слайдер */}
            <FadeInOnScroll>
                <div className="w-full mb-16 rounded-2xl overflow-hidden shadow-xl">
                    <Slider {...settings}>
                        {slideImages.map((src, index) => (
                            <div key={index} className="w-full h-[500px]">
                                <img src={src} alt={`Слайд ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </Slider>
                </div>
            </FadeInOnScroll>

            {/* Контент блоки */}
            <div className="flex flex-col gap-20 mb-20">
                {contentData.map((item, index) => (
                    <FadeInOnScroll key={index} delay={index * 0.1}>
                        <div className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center gap-10`}>
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-[460px] h-[300px] object-cover rounded-2xl shadow-md transition duration-300 hover:shadow-xl"
                            />
                            <div className="w-full max-w-[600px]">
                                <a
                                    href={item.link}
                                    className="text-3xl font-bold text-[#D50032] hover:underline transition-all duration-300"
                                >
                                    {item.title}
                                </a>
                                <p className="mt-4 text-lg leading-7 text-gray-700">{item.text}</p>
                            </div>
                        </div>
                    </FadeInOnScroll>
                ))}
            </div>

            {/* FAQ */}
            <FadeInOnScroll>
                <div className="border-t border-[#D50032] pt-10 mb-16">
                    <h2 className="text-3xl font-bold text-[#D50032] mb-6">Часто задаваемые вопросы</h2>
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div key={index} className="border-b py-3">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="flex justify-between items-center w-full text-left"
                                >
                                    <span className="text-xl font-medium">{faq.question}</span>
                                    <span className="text-red-600 text-2xl font-bold">
                                        {openIndex === index ? "−" : "+"}
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-700 ease-in-out transform ${
                                        openIndex === index
                                            ? "max-h-40 opacity-100 scale-y-100"
                                            : "max-h-0 opacity-0 scale-y-95"
                                    }`}
                                >
                                    <p className="mt-2 text-gray-700">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </FadeInOnScroll>

            {/* Карта + форма */}
            <FadeInOnScroll>
                <div className="mt-20 flex flex-col md:flex-row gap-12 border-t border-gray-300 pt-10">
                    {/* Карта */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Мы располагаемся здесь</h2>
                        <div className="rounded-2xl overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.7627357037104!2d76.86870497563284!3d43.214465580697095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3883685804a93795%3A0x38849e5598fa1531!2z0J3QsNGA0YXQvtC3!5e0!3m2!1sru!2skz!4v1742840062762!5m2!1sru!2skz"
                                width="100%"
                                height="350"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    {/* Форма */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Имеются интересующие вопросы?</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Имя</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:ring-[#D50032] focus:border-[#D50032] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Фамилия</label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:ring-[#D50032] focus:border-[#D50032] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Телефон</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+7 (XXX) XXX XXXX"
                                    className="mt-1 block w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:ring-[#D50032] focus:border-[#D50032] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Повод</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:ring-[#D50032] focus:border-[#D50032] transition"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-[#D50032] text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all disabled:opacity-50"
                            >
                                {submitting ? "Отправка..." : "Отправить"}
                            </button>
                        </form>
                    </div>
                </div>
            </FadeInOnScroll>
        </PageWrapper>
    );
};

export default HomePage;
