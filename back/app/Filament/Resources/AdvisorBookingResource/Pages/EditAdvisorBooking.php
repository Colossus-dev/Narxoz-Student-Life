<?php

namespace App\Filament\Resources\AdvisorBookingResource\Pages;

use App\Filament\Resources\AdvisorBookingResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAdvisorBooking extends EditRecord
{
    protected static string $resource = AdvisorBookingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
