<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    AdvisorBookingController,
    AsmedBookingController,
    AuthController,
    BarbershopBookingController,
    BookingController,
    BookingRequestController,
    DormitoryController,
    FeedbackFormController,
    OrderController,
    ProductController,
    RoomController
};
use App\Models\BookingRequest;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);

Route::get('/dormitories', [DormitoryController::class, 'index']);
Route::get('/dormitories/{id}/rooms', [RoomController::class, 'getByDormitory']);

Route::get('/shop/products', fn () => \App\Models\Product::all());
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::post('/feedback/submit', [FeedbackFormController::class, 'store']);

Route::prefix('barbershop')->group(function () {
    Route::get('/barbers', [BarbershopBookingController::class, 'getBarbers']);
    Route::get('/times', fn () => \App\Models\BarbershopBooking::getAvailableTimes());
    Route::get('/slots', [BarbershopBookingController::class, 'availableSlots']);
});



/*
|--------------------------------------------------------------------------
| Protected Routes (auth:sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // User info & logout
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Вы вышли из системы.']);
    });

    // Booking Requests
    Route::post('/booking-requests', [BookingRequestController::class, 'store']);
    Route::get('/my-bookings', function (Request $request) {
        return BookingRequest::with(['room', 'room.dormitory'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();
    });
    Route::post('/bookings/{id}/pay', [BookingRequestController::class, 'markAsPaid']);
    Route::post('/bookings/{id}/sign', [BookingRequestController::class, 'signContract']);

    // All types of bookings
    Route::get('/my-all-bookings', [BookingController::class, 'index']);

    // Orders
    Route::post('/orders', [OrderController::class, 'store']);

    // Advisor Booking
    Route::post('/advisor-bookings', [AdvisorBookingController::class, 'store']);
    Route::get('/advisor-bookings/occupied', [AdvisorBookingController::class, 'occupied']);
    Route::get('/advisor-bookings/my', [AdvisorBookingController::class, 'my']);

    // Barbershop
    Route::prefix('barbershop')->group(function () {
        Route::post('/book', [BarbershopBookingController::class, 'store']);
        Route::get('/my-barbershop-bookings', [BarbershopBookingController::class, 'index']);
        Route::delete('/bookings/{id}', [BarbershopBookingController::class, 'destroy']);
    });

    // Asmed booking
    Route::prefix('asmed')->group(function () {
        Route::get('/occupied', [AsmedBookingController::class, 'occupied']);
        Route::get('/my', [AsmedBookingController::class, 'my']);
        Route::post('/book', [AsmedBookingController::class, 'store']);
    });
});
