<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AsmedBookingResource\Pages;
use App\Filament\Resources\AsmedBookingResource\RelationManagers;
use App\Models\AsmedBooking;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AsmedBookingResource extends Resource
{
    protected static ?string $model = AsmedBooking::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Медицанылық Пункт';

    protected static ?string $navigationLabel = 'Медициналық Пунктке жазылу';
    protected static ?string $pluralModelLabel = 'Медициналық Пунктке жазылу';
    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('user_id')
                ->relationship('user', 'name')
                ->required(),

            Forms\Components\TextInput::make('iin')
                ->required(),

            Forms\Components\DatePicker::make('date')
                ->required(),

            Forms\Components\TextInput::make('time')
                ->required(),

            Forms\Components\Textarea::make('reason')
                ->required(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('user.name')->label('Студент')->sortable()->searchable(),
            TextColumn::make('iin')->label('ЖСН'),
            TextColumn::make('date')->label('Күні')->sortable(),
            TextColumn::make('time')->label('Уақыты')->sortable(),
            TextColumn::make('reason')->label('Себеп')->limit(50)->tooltip(fn ($record) => $record->reason),
        ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
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
            'index' => Pages\ListAsmedBookings::route('/'),
            'create' => Pages\CreateAsmedBooking::route('/create'),
            'edit' => Pages\EditAsmedBooking::route('/{record}/edit'),
        ];
    }
}
