<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FeedbackFormResource\Pages;
use App\Models\FeedbackForm;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class FeedbackFormResource extends Resource
{
    protected static ?string $model = FeedbackForm::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationGroup = 'Кері байланыс формасы';
    protected static ?string $navigationLabel = 'Кері байланыс формасы';
    protected static ?string $pluralModelLabel = 'Кері байланыс формасы';
    protected static ?string $modelLabel = 'Форма';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Имя')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('surname')
                    ->label('Фамилия')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('phone')
                    ->label('Телефон')
                    ->required()
                    ->tel()
                    ->maxLength(20),

                Forms\Components\Textarea::make('message')
                    ->label('Сообщение')
                    ->required()
                    ->rows(5)
                    ->maxLength(1000),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Имя')->searchable(),
                Tables\Columns\TextColumn::make('surname')->label('Фамилия')->searchable(),
                Tables\Columns\TextColumn::make('phone')->label('Телефон'),
                Tables\Columns\TextColumn::make('message')->label('Сообщение')->limit(50)->wrap(),
                Tables\Columns\TextColumn::make('created_at')->label('Создано')->dateTime('d.m.Y H:i'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([])
            ->actions([
                Tables\Actions\ViewAction::make()->label('Просмотр'),
                Tables\Actions\EditAction::make()->label('Редактировать'),
                Tables\Actions\DeleteAction::make()->label('Удалить'),
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
            'index' => Pages\ListFeedbackForms::route('/'),
            'create' => Pages\CreateFeedbackForm::route('/create'),
            'edit' => Pages\EditFeedbackForm::route('/{record}/edit'),
        ];
    }
}
