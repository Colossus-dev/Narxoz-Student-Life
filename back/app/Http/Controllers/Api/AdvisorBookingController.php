<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdvisorBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class AdvisorBookingController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'school' => 'required|string',
            'faculty' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
        ]);

        $booking = AdvisorBooking::create([
            'user_id' => Auth::id(),
            ...$data,
        ]);

        // Email отправка
        $user = Auth::user();
        Mail::raw("Вы записались к эдвайзеру на {$data['date']} в {$data['time']} по факультету {$data['faculty']} ({$data['school']})", function ($message) use ($user) {
            $message->to($user->email)
                ->subject('Запись к эдвайзеру подтверждена');
        });

        return response()->json(['message' => 'Запись успешно создана']);
    }
    public function occupied(Request $request)
    {
        $request->validate(['date' => 'required|date']);

        return AdvisorBooking::whereDate('date', $request->date)
            ->pluck('time');
    }
    public function my(Request $request)
    {
        return $request->user()->advisorBookings()->get();
    }

}
