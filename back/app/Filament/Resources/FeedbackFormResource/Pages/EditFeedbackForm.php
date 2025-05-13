<?php

namespace App\Filament\Resources\FeedbackFormResource\Pages;

use App\Filament\Resources\FeedbackFormResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFeedbackForm extends EditRecord
{
    protected static string $resource = FeedbackFormResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
