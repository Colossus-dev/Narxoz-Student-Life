<?php

namespace App\Filament\Resources\BarberResource\Pages;

use App\Filament\Resources\BarberResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListBarbers extends ListRecords
{
    protected static string $resource = BarberResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
