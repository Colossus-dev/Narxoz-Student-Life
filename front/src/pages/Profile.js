import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Button } from "@mui/material";
import { Logout, Edit } from "@mui/icons-material";
import PageWrapper from "../components/PageWrapper";

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    if (!user) return <p className="text-center mt-10 text-lg">Загрузка профиля...</p>;

    return (
        <>
        <PageWrapper>
            {/* Фон страницы */}
            <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-10">
                <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-10 flex items-start border border-gray-200">
                    <div className="flex flex-col items-center w-1/3 pr-10 border-r border-gray-300">
                        <img
                            src={`http://localhost:8000/storage/${user.avatar}`}
                            alt={user.name}
                            className="w-40 h-40 rounded-full border-4 border-gray-300 shadow-md object-cover mb-5"
                        />
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
                            <Button
                                variant="contained"
                                startIcon={<Logout />}
                                onClick={handleLogout}
                                className="!bg-red-600 hover:!bg-red-700"
                            >
                                Выйти
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
        </>
    );
};

export default Profile;
