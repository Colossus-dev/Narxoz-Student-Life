<?php

namespace App\Services;

use App\Mail\ReservedRoomAssignedMail;
use App\Mail\BookingApprovedMail;
use App\Models\BookingRequest;
use App\Models\Room;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Exception;

class BookingService
{
    public function validateRoomAvailability(BookingRequest $bookingRequest): void
    {
        $room = Room::findOrFail($bookingRequest->room_id);
        $approvedCount = $room->bookingRequests()->where('status', 'approved')->count();

        if ($approvedCount >= $room->capacity) {
            if (!empty($bookingRequest->privileges)) {
                $this->assignReservedRoom($bookingRequest);
                Log::info("Льготник перенаправлен в резервную комнату", [
                    'user_id' => $bookingRequest->user_id
                ]);
            } else {
                throw new Exception("Комната №{$room->room_number} уже занята.");
            }
        }
    }

    public function assignReservedRoom(BookingRequest $bookingRequest): void
    {
        $availableRooms = Room::where('reserve_status', true)->get();

        $suitableRoom = $availableRooms->filter(function ($room) {
            $approved = $room->bookingRequests()->where('status', 'approved')->count();
            return $approved < $room->capacity;
        });

        if ($suitableRoom->isEmpty()) {
            throw new Exception("Нет свободных резервных комнат!");
        }

        $selectedRoom = $suitableRoom->random();

        // ❗ Важно: мы сохраняем модель прямо тут, что вызывает возможный конфликт при создании!
        $bookingRequest->room_id = $selectedRoom->id;
        $bookingRequest->saveQuietly();

        // Отправляем уведомление
        Mail::to($bookingRequest->user->email)
            ->queue(new ReservedRoomAssignedMail($bookingRequest));
    }

    public function handleApproved(BookingRequest $bookingRequest): void
    {
        Mail::to($bookingRequest->user->email)
            ->queue(new BookingApprovedMail($bookingRequest));

        $this->generateKaspiQr($bookingRequest);
    }

    public function generateKaspiQr(BookingRequest $bookingRequest): void
    {
        if ($bookingRequest->payment_qr_url) return;

        $amount = $bookingRequest->room->price;
        $kaspiNumber = '77075723696';

        $qrData = "ST00012|Name=Kaspi Pay Test|PersonalAcc={$kaspiNumber}|Sum={$amount}|Purpose=Бронь #{$bookingRequest->id}";
        $qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" . urlencode($qrData);

        $bookingRequest->updateQuietly(['payment_qr_url' => $qrUrl]);
    }

    public function signContract(BookingRequest $bookingRequest, array $data): void
    {
        if ($bookingRequest->payment_status !== 'paid') {
            throw new Exception("Нельзя подписать договор до оплаты.");
        }

        $bookingRequest->update([
            'contract_data' => json_encode($data),
            'contract_signed' => true,
        ]);
    }
}
