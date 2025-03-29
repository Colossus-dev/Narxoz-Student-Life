<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingRequestController;
use App\Http\Controllers\Api\DormitoryController;
use App\Http\Controllers\Api\RoomController;
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

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);
Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Вы вышли из системы.']);
});
Route::middleware('auth:sanctum')->post('/booking-requests', [BookingRequestController::class, 'store']);
Route::get('/dormitories', [DormitoryController::class, 'index']);
Route::get('/dormitories/{id}/rooms', [RoomController::class, 'getByDormitory']);

Route::middleware('auth:sanctum')->get('/my-bookings', function (Request $request) {
    return BookingRequest::with(['room', 'room.dormitory'])
        ->where('user_id', $request->user()->id)
        ->latest()
        ->get();
});
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/bookings/{id}/pay', [BookingRequestController::class, 'markAsPaid']);
    Route::post('/bookings/{id}/sign', [BookingRequestController::class, 'signContract']);
});


