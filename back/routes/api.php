<?php

use App\Http\Controllers\Api\AdvisorBookingController;
use App\Http\Controllers\Api\AsmedBookingController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BarbershopBookingController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\BookingRequestController;
use App\Http\Controllers\Api\DormitoryController;
use App\Http\Controllers\Api\FeedbackFormController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RoomController;
use App\Models\BookingRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


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

Route::post('/feedback/submit', [FeedbackFormController::class, 'store']);
Route::prefix('barbershop')->group(function () {
    Route::get('/barbers', [BarbershopBookingController::class, 'getBarbers']);
    Route::get('/times', fn () => App\Models\BarbershopBooking::getAvailableTimes());
    Route::get('/slots', [BarbershopBookingController::class, 'availableSlots']);
    Route::middleware('auth:sanctum')->post('/book', [BarbershopBookingController::class, 'store']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/my-barbershop-bookings', [BarbershopBookingController::class, 'index']);
    Route::delete('/barbershop/bookings/{id}', [BarbershopBookingController::class, 'destroy']);
});
Route::get('/shop/products', function () {
    return \App\Models\Product::all();
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::middleware('auth:sanctum')->post('/orders', [OrderController::class, 'store']);
Route::middleware('auth:sanctum')->post('/advisor-bookings', [AdvisorBookingController::class, 'store']);
Route::get('/advisor-bookings/occupied', [AdvisorBookingController::class, 'occupied']);

Route::middleware('auth:sanctum')->get('/my-all-bookings', [BookingController::class, 'index']);

Route::middleware('auth:sanctum')->prefix('asmed')->group(function () {
    Route::get('/occupied', [AsmedBookingController::class, 'occupied']);
    Route::get('/my', [AsmedBookingController::class, 'my']);
    Route::post('/book', [AsmedBookingController::class, 'store']);
});

