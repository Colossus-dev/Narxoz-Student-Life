<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DormitoryResource\Pages;
use App\Models\Dormitory;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;

class DormitoryResource extends Resource
{
    protected static ?string $model = Dormitory::class;
    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static ?string $navigationGroup = 'Жатақхана'; // ← перевод
    protected static ?string $navigationLabel = 'Жатақханалар';
    protected static ?string $pluralModelLabel = 'Жатақханалар';
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label('Название общежития') // ← перевод
                    ->required()
                    ->maxLength(255),
                Forms\Components\FileUpload::make('image')
                    ->label('Фото общежития')
                    ->image()
                    ->imagePreviewHeight('150')
                    ->directory('dormitories')
                    ->maxSize(5024)
                    ->columnSpanFull(),

            ]);

    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),
                TextColumn::make('name')->label('Название общежития')->sortable()->searchable(), // ← перевод
                Tables\Columns\ImageColumn::make('image')
                    ->label('Фото')
                    ->disk('public')
                    ->width(80)
                    ->height(60),

                TextColumn::make('created_at')->label('Дата создания')->dateTime()->sortable(), // ← перевод
            ])
            ->filters([])
            ->actions([
                EditAction::make()->label('Редактировать'), // можно добавить переводы экшенов
                DeleteAction::make()->label('Удалить'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()->label('Удалить выбранные'),
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
            'index' => Pages\ListDormitories::route('/'),
            'create' => Pages\CreateDormitory::route('/create'),
            'edit' => Pages\EditDormitory::route('/{record}/edit'),
        ];
    }
}
