<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Barber;
use App\Models\BarbershopBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class BarbershopBookingController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();

        $bookings = BarbershopBooking::with('barber')
            ->where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'date' => $booking->date,
                    'time' => $booking->time,
                    'barber' => $booking->barber->name,
                ];
            });

        return response()->json($bookings);
    }

    public function getBarbers()
    {
        return Barber::all(['id', 'name']);
    }

    public function availableSlots(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'barber_name' => 'required|string',
        ]);

        $barber = Barber::where('name', $request->barber_name)->firstOrFail();
        $allSlots = BarbershopBooking::getAvailableTimes();

        $bookedTimes = BarbershopBooking::where('barber_id', $barber->id)
            ->where('date', $request->date)
            ->pluck('time')
            ->toArray();

        $availableSlots = array_map(fn($time) => [
            'time' => $time,
            'available' => !in_array($time, $bookedTimes)
        ], $allSlots);

        return response()->json($availableSlots);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'time' => ['required', Rule::in(BarbershopBooking::getAvailableTimes())],
            'barber_name' => 'required|string'
        ]);

        $barber = Barber::where('name', $request->barber_name)->firstOrFail();

        $exists = BarbershopBooking::where('barber_id', $barber->id)
            ->where('date', $request->date)
            ->where('time', $request->time)
            ->exists();

        if ($exists) {
            return response()->json(['error' => 'Это время уже занято'], 422);
        }

        $booking = BarbershopBooking::create([
            'user_id' => Auth::id(),
            'barber_id' => $barber->id,
            'date' => $request->date,
            'time' => $request->time
        ]);

        return response()->json(['message' => 'Бронирование успешно', 'booking' => $booking]);
    }
    public function destroy(Request $request, $id)
    {
        $booking = BarbershopBooking::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $booking->delete();

        return response()->json(['message' => 'Бронирование удалено']);
    }

}

