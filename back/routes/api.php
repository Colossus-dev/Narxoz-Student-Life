<?php

use App\Models\BookingRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/booking/{id}/sign-contract', function (Request $request, $id) {
    $booking = BookingRequest::findOrFail($id);

    if ($booking->payment_status !== 'paid') {
        return response()->json(['error' => 'Оплата не подтверждена'], 403);
    }

    $data = $request->validate([
        'full_name' => 'required|string',
        'passport_number' => 'required|string',
        'contract_date' => 'required|date',
    ]);

    $booking->signContract($data);

    return response()->json(['message' => 'Договор успешно подписан']);
});
