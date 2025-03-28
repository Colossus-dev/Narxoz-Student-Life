import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Button } from "@mui/material";
import { Logout, Edit } from "@mui/icons-material";

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/user", {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        Accept: "application/json",
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Ошибка при получении данных пользователя:", error);
            }
        };

        fetchUser();
    }, []);

    if (!user) return <p>Загрузка...</p>;

    return (
        <>
            {/* Фон страницы */}
            <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-10">
                <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-10 flex items-start border border-gray-200">
                    <div className="flex flex-col items-center w-1/3 pr-10 border-r border-gray-300">
                        <img
                            src="/avatar.jpg"
                            alt="User Profile"
                            className="w-40 h-40 rounded-full border-4 border-gray-300 shadow-md object-cover mb-5"
                        />
                        <Button variant="outlined" startIcon={<Edit />}>
                            Изменить
                        </Button>
                    </div>

                    <div className="w-2/3 pl-10">
                        <div className="space-y-6">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 text-lg">Имя</span>
                                <span className="text-gray-900 font-semibold text-lg">{user.name}</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 text-lg">Email</span>
                                <span className="text-gray-900 font-semibold text-lg">{user.email}</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 text-lg">Телефон</span>
                                <span className="text-gray-900 font-semibold text-lg">{user.phone || '-'}</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 text-lg">Факультет</span>
                                <span className="text-gray-900 font-semibold text-lg">{user.faculty || '-'}</span>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-center">
                            <Button variant="contained" startIcon={<Logout />} className="!bg-red-600 hover:!bg-red-700">
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
