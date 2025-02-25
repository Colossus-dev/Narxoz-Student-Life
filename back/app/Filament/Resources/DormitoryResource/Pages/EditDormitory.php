<?php

namespace App\Filament\Resources\DormitoryResource\Pages;

use App\Filament\Resources\DormitoryResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDormitory extends EditRecord
{
    protected static string $resource = DormitoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
