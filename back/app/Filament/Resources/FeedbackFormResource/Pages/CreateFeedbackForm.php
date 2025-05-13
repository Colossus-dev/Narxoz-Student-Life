<?php

namespace App\Filament\Resources\FeedbackFormResource\Pages;

use App\Filament\Resources\FeedbackFormResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateFeedbackForm extends CreateRecord
{
    protected static string $resource = FeedbackFormResource::class;
}
