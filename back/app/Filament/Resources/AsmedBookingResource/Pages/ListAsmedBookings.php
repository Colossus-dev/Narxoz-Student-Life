<?php

namespace App\Filament\Resources\AsmedBookingResource\Pages;

use App\Filament\Resources\AsmedBookingResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAsmedBookings extends ListRecords
{
    protected static string $resource = AsmedBookingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
