<?php
namespace App\Filament\Resources;

use App\Filament\Resources\RoomResource\Pages;
use App\Models\Room;
use App\Models\Dormitory;
use Filament\Forms;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;

class RoomResource extends Resource
{
    protected static ?string $model = Room::class;
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Жатақхана';
    protected static ?string $navigationLabel = 'Жатақхана Бөлмелері';
    protected static ?string $pluralModelLabel = 'Жатақхана Бөлмелері';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('dormitory_id')
                    ->label('Dormitory')
                    ->options(Dormitory::pluck('name', 'id'))
                    ->searchable()
                    ->required(),

                TextInput::make('floor')
                    ->label('Floor')
                    ->required(),

                TextInput::make('room_number')
                    ->label('Room Number')
                    ->required(),

                TextInput::make('capacity')
                    ->label('Capacity')
                    ->required(),

                TextInput::make('occupied')
                    ->label('Occupied')
                    ->default(0),
                TextInput::make('price')
                    ->label('Price')
                    ->numeric()
                    ->minValue(0)
                    ->step(0.01)
                    ->required(),
                Forms\Components\Toggle::make('reserve_status')
                    ->label('Резервная Комната для Льготников')
                    ->helperText('Отметьте, если эта комната предназначена только для льготных студентов')
                    ->default(false),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),
                TextColumn::make('dormitory.name')->label('Dormitory')->sortable(),
                TextColumn::make('floor')->label('Floor')->sortable(),
                TextColumn::make('room_number')->label('Room Number')->sortable(),
                TextColumn::make('capacity')->label('Capacity')->sortable(),
                TextColumn::make('occupied')->label('Occupied')->sortable(),
                TextColumn::make('price')->label('Price')->sortable(),
                Tables\Columns\BooleanColumn::make('reserve_status')
                    ->label('Reserve Room'),
                TextColumn::make('created_at')->label('Created At')->dateTime()->sortable(),
            ])
            ->filters([])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRooms::route('/'),
            'create' => Pages\CreateRoom::route('/create'),
            'edit' => Pages\EditRoom::route('/{record}/edit'),
        ];
    }
}
