<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'api/*',
        'http://localhost:8000/api/login',
        'http://localhost:8000/api/booking-requests',
        'http://localhost:8000/api/my-bookings',
        'api/bookings/*/pay',
        'api/bookings/*/sign',

    ];
}
