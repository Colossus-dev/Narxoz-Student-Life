import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
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
            text: "Все студенты, нуждающиеся в жилье, будут размещены в одном из четырех общежитий. Здания общежитий расположены рядом с учебными корпусами. Вместительность до 1171 студентов. Жилая площадь на одного человека в ДС 2А, 2Б и 3 — 6,6 кв.м, в новом общежитии Narxoz Residence — 11,2 кв.м.",
        },
        {
            image: "/barber.png",
            title: "Narxoz Barbershop",
            link: "/barbershop",
            text: "Narxoz Barbershop — это профессиональный барбершоп на территории университета, где студенты могут получить качественные услуги стрижки и ухода за волосами по доступным ценам.",
        },
        {
            image: "/shop.png",
            title: "Narxoz Shop",
            link: "/shop",
            text: "Narxoz Shop предлагает широкий ассортимент товаров с фирменной символикой университета, включая одежду, аксессуары и канцелярию.",
        },
    ];

    const faqData = [
        {
            question: "Университетке түсу үшін қандай талаптар бар?",
            answer: "Университетке түсу үшін талаптар қатарына ҰБТ нәтижелері, мотивациялық хат және басқа да қажетті құжаттар жатады.",
        },
        {
            question: "Университет шетелдік студенттерге қандай қолдау көрсетеді?",
            answer: "Шетелдік студенттер үшін арнайы поддержка қызметтері, тілдік курстар және визалық көмек ұсынылады.",
        },
        {
            question: "Barbershop-қа төлем қалай жүзеге асады?",
            answer: "Біздің сайтта бронь жасап, сол уақытта шаштаразға барып, төлемді қолма-қол жасайсыз.",
        },
        {
            question: "Киім сәйкес келмесе, ауыстыру немесе қайтаруға бола ма?",
            answer: "Қайтару немесе ауыстыру қарастырылмаған.",
        },
    ];

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-[#D50032] mb-6 font-montserrat">
                Добро пожаловать, Assylkhan
            </h1>

            {/* Слайдер */}
            <div className="w-full mb-16">
                <Slider {...settings}>
                    {slideImages.map((src, index) => (
                        <div key={index} className="w-full h-[550px] flex items-center justify-center">
                            <img src={src} alt={`Слайд ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Контент блоки */}
            <div className="flex flex-col gap-12 mb-20">
                {contentData.map((item, index) => (
                    <div key={index} className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center gap-20`}>
                        <img src={item.image} alt={`Изображение ${index + 1}`} className="w-[500px] h-[350px] object-cover flex-shrink-0" />
                        <div className="w-[600px] gap-12 mb-40">
                            <a href={item.link} className="text-3xl font-bold text-[#D50032] hover:underline block mb-6">
                                {item.title}
                            </a>
                            <p className="text-lg leading-6 text-left font-montserrat">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* F.A.Q Section */}
            <div className="border-t border-[#D50032] pt-6 mb-16">
                <h2 className="text-3xl font-bold text-[#D50032] mb-4">Faq:</h2>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="border-b py-3">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex justify-between items-center w-full text-left transition-all duration-700 ease-in-out"
                            >
                                <span className="text-xl font-medium">{faq.question}</span>
                                <span className="text-red-600 text-2xl font-bold">{openIndex === index ? "−" : "+"}</span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-700 ease-in-out transform ${
                                    openIndex === index ? "max-h-40 opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-95"
                                }`}
                            >
                                <p className="mt-2 text-gray-700">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Карта и форма */}
            <div className="mt-20 flex flex-col md:flex-row gap-12 border-t border-gray-300 pt-10">
                {/* Карта */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Мы располагаемся здесь</h2>
                    <div className="rounded-lg overflow-hidden shadow-lg">
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
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Имя</label>
                            <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Фамилия</label>
                            <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Телефон</label>
                            <input
                                type="tel"
                                required
                                placeholder="+7 (XXX) XXX XXXX"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Повод</label>
                            <textarea className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows="3"></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#D50032] text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
