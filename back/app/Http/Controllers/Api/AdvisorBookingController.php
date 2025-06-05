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
            'reason' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $user = Auth::user();

        $alreadyBooked = AdvisorBooking::where('user_id', $user->id)->exists();

        if ($alreadyBooked) {
            return response()->json([
                'message' => 'Вы уже записаны к эдвайзеру. Повторная запись невозможна.'
            ], 409); // HTTP 409 Conflict
        }

        $booking = AdvisorBooking::create([
            'user_id' => Auth::id(),
            ...$data,
        ]);

        // Email отправка
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
