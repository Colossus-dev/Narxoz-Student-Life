<?php

namespace App\Filament\Resources\DormitoryResource\Pages;

use App\Filament\Resources\DormitoryResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListDormitories extends ListRecords
{
    protected static string $resource = DormitoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
