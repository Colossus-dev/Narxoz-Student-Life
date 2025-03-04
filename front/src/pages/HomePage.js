import React, {useState} from "react";
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

    const slideImages = [
        "/slide1.png",
        "/slide2.png",
        "/slide3.png",
    ];
    const contentData = [
        {
            image: "/dorm1.png",
            text: "Все студенты, нуждающиеся в жилье, будут размещены в одном из четырех общежитий. Здания общежитий расположены рядом с учебными корпусами. Вместительность до 1171 студентов. Жилая площадь на одного человека в ДС 2А, 2Б и 3 — 6,6 кв.м, в новом общежитии Narxoz Residence — 11,2 кв.м."
        },
        {
            image: "/barber.png",
            text: "Narxoz Barbershop — это профессиональный барбершоп на территории университета, где студенты могут получить качественные услуги стрижки и ухода за волосами по доступным ценам."
        },
        {
            image: "/shop.png",
            text: "Narxoz Shop предлагает широкий ассортимент товаров с фирменной символикой университета, включая одежду, аксессуары и канцелярию."
        }
    ];
    const faqData = [
        {
            question: "Университетке түсу үшін қандай талаптар бар?",
            answer: "Университетке түсу үшін талаптар қатарына ҰБТ нәтижелері, мотивациялық хат және басқа да қажетті құжаттар жатады."
        },
        {
            question: "Университет шетелдік студенттерге қандай қолдау көрсетеді?",
            answer: "Шетелдік студенттер үшін арнайы қолдау қызметтері, тілдік курстар және визалық көмек ұсынылады."
        },
        {
            question: "Barbershop-қа төлем қалай жүзеге асады?",
            answer: "Біздің сайтта бронь жасап, сол уақытта шаштаразға барып, төлемді қолма-қол жасайсыз."
        },
        {
            question: "Киім сәйкес келмесе, ауыстыру немесе қайтаруға бола ма?",
            answer: "Қайтару немесе ауыстыру қарастырылмаған."
        }
    ];

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-6 ">
            <h1 className="text-2xl font-bold text-red-600 mb-6 font-montserrat" >Добро пожаловать, Тумар</h1>

            <div className="w-full mb-20">
                <Slider {...settings}>
                    {slideImages.map((src, index) => (
                        <div key={index} className="w-full h-[300px] flex items-center justify-center">
                            <img src={src} alt={`Слайд ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="flex flex-col gap-12 mb-20">
                {contentData.map((item, index) => (
                    <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-12`}>
                        <img src={item.image} alt={`Изображение ${index + 1}`} className="w-[500px] h-[350px] object-cover flex-shrink-0" />
                        <p className="w-[600px] text-sm leading-6 text-left font-montserrat">{item.text}</p>
                    </div>
                ))}
            </div>
            <div className="border-t border-[#D50032] pt-6">
                <h2 className="text-xl font-bold text-[#D50032] mb-4">Faq:</h2>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="border-b py-3">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex justify-between items-center w-full text-left"
                            >
                                <span className="text-lg font-medium">{faq.question}</span>
                                <span className="text-red-600 text-xl font-bold">{openIndex === index ? "−" : "+"}</span>
                            </button>
                            {openIndex === index && (
                                <p className="mt-2 text-gray-700">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default HomePage;

