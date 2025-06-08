<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AsmedBooking;
use Illuminate\Http\Request;

class AsmedBookingController extends Controller
{
    public function occupied(Request $request)
    {
        $date = $request->query('date');
        $times = AsmedBooking::where('date', $date)->pluck('time');
        return response()->json($times);
    }

    public function my(Request $request)
    {
        return $request->user()->asmedBookings()->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'iin' => 'required|string|max:12',
            'time' => 'required|string',
            'reason' => 'required|string|max:1000',
        ]);

        $exists = AsmedBooking::where('user_id', $request->user()->id)
            ->where('iin', $validated['iin'])
            ->where('date', $validated['date'])
            ->where('time', $validated['time'])
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Slot already booked.'], 409);
        }

        $booking = AsmedBooking::create([
            'user_id' => $request->user()->id,
            'iin' => $validated['iin'],
            'date' => $validated['date'],
            'time' => $validated['time'],
            'reason' => $validated['reason'],
        ]);

        return response()->json($booking, 201);
    }
}
