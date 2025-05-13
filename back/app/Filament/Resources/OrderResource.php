<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;
    protected static ?string $navigationIcon = 'heroicon-o-receipt-refund';
    protected static ?string $navigationGroup = 'Shop';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('user.name')->label('Пользователь')->disabled(),
                Forms\Components\Textarea::make('items')
                    ->label('Товары')
                    ->disabled()
                    ->rows(8)
                    ->formatStateUsing(fn ($state) => json_encode($state, JSON_PRETTY_PRINT)),
                Forms\Components\TextInput::make('total')->label('Сумма')->disabled(),
                Forms\Components\Select::make('status')
                    ->label('Статус')
                    ->options([
                        'в обработке' => 'в обработке',
                        'выдан' => 'выдан',
                    ])
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->label('ID')->sortable(),
                TextColumn::make('user.name')->label('Пользователь')->searchable(),
                TextColumn::make('total')->label('Сумма')->sortable(),
                TextColumn::make('status')->label('Статус')->badge()->color(fn (string $state): string => match ($state) {
                    'в обработке' => 'warning',
                    'выдан' => 'success',
                }),
                TextColumn::make('created_at')->label('Дата')->dateTime('d.m.Y H:i'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Action::make('markAsIssued')
                    ->label('✅ Отметить как выдано')
                    ->visible(fn ($record) => $record->status !== 'выдан')
                    ->requiresConfirmation()
                    ->action(function (Order $record) {
                        $record->status = 'выдан';
                        $record->save();
                    })
                    ->color('success'),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
