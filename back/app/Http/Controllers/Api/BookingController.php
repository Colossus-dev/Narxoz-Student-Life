<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'dormitory' => $user->bookings()->with('room.dormitory')->get(),
            'barbershop' => $user->barbershopBookings,
            'advisor' => $user->advisorBookings,
            'asmed' => $user->asmedBookings,
        ]);
    }

}
