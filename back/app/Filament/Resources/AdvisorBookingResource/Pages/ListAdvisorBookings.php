<?php

namespace App\Filament\Resources\AdvisorBookingResource\Pages;

use App\Filament\Resources\AdvisorBookingResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAdvisorBookings extends ListRecords
{
    protected static string $resource = AdvisorBookingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
