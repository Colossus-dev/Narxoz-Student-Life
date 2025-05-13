<?php

namespace App\Filament\Resources\FeedbackFormResource\Pages;

use App\Filament\Resources\FeedbackFormResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFeedbackForms extends ListRecords
{
    protected static string $resource = FeedbackFormResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
