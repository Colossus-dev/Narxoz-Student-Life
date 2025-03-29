// pages/BookingPage.js
import React, { useState } from "react";
import DormitorySelector from "../components/DormitorySelector";
import RoomGrid from "../components/RoomGrid";
import BookingForm from "../components/BookingForm";
import PageWrapper from "../components/PageWrapper";

const BookingPage = () => {
    const [selectedDormitory, setSelectedDormitory] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);

    return (
        <PageWrapper>
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Бронирование общежития
                </h1>

                <DormitorySelector onSelectDormitory={setSelectedDormitory} />

                {selectedDormitory && !selectedRoom && (
                    <RoomGrid dormitory={selectedDormitory} onSelectRoom={setSelectedRoom} />
                )}

                {selectedRoom && (
                    <BookingForm dormitory={selectedDormitory} room={selectedRoom} />
                )}
            </div>
        </PageWrapper>

            );
};

export default BookingPage;
