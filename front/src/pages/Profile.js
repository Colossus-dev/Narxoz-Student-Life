import React from "react";
import Header from "../components/Header";
import { Button } from "@mui/material";
import { Logout, Edit } from "@mui/icons-material";

const Profile = () => {
    return (
        <>

            {/* Фон страницы */}
            <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-10">

                {/* Карточка профиля */}
                <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-10 flex items-start border border-gray-200">

                    {/* Левая часть - Аватар и кнопка "Изменить" */}
                    <div className="flex flex-col items-center w-1/3 pr-10 border-r border-gray-300">
                        <img 
                            src="/avatar.jpg" 
                            alt="User Profile" 
                            className="w-40 h-40 rounded-full border-4 border-gray-300 shadow-md object-cover mb-5"
                        />


                        <Button
                            variant="outlined"
                            startIcon={<Edit />}
                            className="mt-20 !border-blue-500 text-blue-500 hover:!bg-blue-100 px-6 py-2 rounded-lg text-md shadow"
                        >
                            Изменить
                        </Button>
                    </div>

                    {/* Правая часть - Информация пользователя */}
                    <div className="w-2/3 pl-10">
                        <div className="space-y-6">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 text-lg">Имя</span>
                                <span className="text-gray-900 font-semibold text-lg">Kazakbayeva Akgulim</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 text-lg">Email</span>
                                <span className="text-gray-900 font-semibold text-lg">qazaqaewa@email.com</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 text-lg">Телефон</span>
                                <span className="text-gray-900 font-semibold text-lg">+7 777 123 4568</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 text-lg">Город</span>
                                <span className="text-gray-900 font-semibold text-lg">Алматы</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 text-lg">Факультет</span>
                                <span className="text-gray-900 font-semibold text-lg">Информационные технологии</span>
                            </div>
                        </div>

                        {/* Кнопка "Выйти" */}
                        <div className="mt-10 flex justify-center">
                            <Button
                                variant="contained"
                                startIcon={<Logout />}
                                className="!bg-red-600 hover:!bg-red-700 text-white px-10 py-3 rounded-lg shadow-lg text-lg transition-transform transform hover:scale-105"
                            >
                                Выйти
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
