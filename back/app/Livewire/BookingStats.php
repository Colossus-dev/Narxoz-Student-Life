<?php

namespace App\Livewire;

use App\Models\BookingRequest;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;

class BookingStats extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Всего заявок', BookingRequest::count()),
            Stat::make('Одобрено', BookingRequest::where('status', 'approved')->count()),
            Stat::make('Оплачено', BookingRequest::where('payment_status', 'paid')->count()),
        ];
    }
}
