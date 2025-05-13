<?php

namespace App\Filament\Resources\BarbershopBookingResource\Pages;

use App\Filament\Resources\BarbershopBookingResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditBarbershopBooking extends EditRecord
{
    protected static string $resource = BarbershopBookingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
