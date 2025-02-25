<?php

namespace App\Filament\Resources\BookingRequestResource\Pages;

use App\Filament\Resources\BookingRequestResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateBookingRequest extends CreateRecord
{
    protected static string $resource = BookingRequestResource::class;
}
