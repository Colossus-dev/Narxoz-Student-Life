<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BarbershopBookingResource\Pages;
use App\Filament\Resources\BarbershopBookingResource\RelationManagers;
use App\Models\BarbershopBooking;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;


class BarbershopBookingResource extends Resource
{
    protected static ?string $model = BarbershopBooking::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('user_id')
                ->relationship('user', 'name')->required(),

            Forms\Components\Select::make('barber_id')
                ->relationship('barber', 'name')->required(),

            Forms\Components\DatePicker::make('date')->required(),

            Forms\Components\Select::make('time')
                ->options(array_combine(
                    BarbershopBooking::getAvailableTimes(),
                    BarbershopBooking::getAvailableTimes()
                ))->required(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')->label('Пользователь'),
                Tables\Columns\TextColumn::make('barber.name')->label('Барбер'),
                Tables\Columns\TextColumn::make('date'),
                Tables\Columns\TextColumn::make('time'),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->label('Создано'),
            ])
            ->filters([
                SelectFilter::make('barber')->relationship('barber', 'name')->label('Барбер'),
                Tables\Filters\Filter::make('date')->label('Дата'),])
            ->defaultSort('date', 'desc');
    }


    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBarbershopBookings::route('/'),
            'create' => Pages\CreateBarbershopBooking::route('/create'),
            'edit' => Pages\EditBarbershopBooking::route('/{record}/edit'),
        ];
    }
}
