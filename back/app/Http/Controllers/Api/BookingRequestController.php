<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BookingRequest;
use Illuminate\Http\Request;

class BookingRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'city' => 'required|string',
            'privileges' => 'nullable|string',
            'attached_file' => 'nullable|file|max:5120|mimes:pdf,jpg,jpeg,png',
        ]);

        // 🔐 Проверка: есть ли уже заявка от пользователя
        $alreadyExists = BookingRequest::where('user_id', $validated['user_id'])->exists();

        if ($alreadyExists) {
            return response()->json([
                'message' => 'Вы уже подали заявку на общежитие. Повторная подача невозможна.',
            ], 409); // HTTP 409 Conflict
        }

        $filePath = null;

        if ($request->hasFile('attached_file')) {
            $filePath = $request->file('attached_file')->store('privileges', 'public');
        }

        $booking = BookingRequest::create([
            'user_id' => $validated['user_id'],
            'room_id' => $validated['room_id'],
            'city' => $validated['city'],
            'privileges' => $validated['privileges'],
            'attached_files' => $filePath,
            'status' => 'pending',
            'payment_status' => 'pending',
            'contract_signed' => false,
        ]);

        return response()->json($booking, 201);
    }


    // POST /api/bookings/{id}/pay
    public function markAsPaid($id) {
        $booking = BookingRequest::findOrFail($id);
        $booking->update(['payment_status' => 'paid']);
        return response()->json(['success' => true]);
    }

// POST /api/bookings/{id}/sign
    public function signContract($id) {
        $booking = BookingRequest::findOrFail($id);

        if ($booking->payment_status !== 'paid') {
            return response()->json(['error' => 'Оплата не подтверждена'], 400);
        }

        $booking->update(['contract_signed' => true]);
        return response()->json(['success' => true]);
    }

}
