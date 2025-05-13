<?php

namespace App\Filament\Resources\AsmedBookingResource\Pages;

use App\Filament\Resources\AsmedBookingResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAsmedBooking extends EditRecord
{
    protected static string $resource = AsmedBookingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
