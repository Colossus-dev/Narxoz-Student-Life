<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingRequestResource\Pages;
use App\Models\BookingRequest;
use App\Models\Room;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\ViewField;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\BooleanColumn;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;

class BookingRequestResource extends Resource
{
    protected static ?string $model = BookingRequest::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationGroup = 'Управление общежитиями';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_id')
                    ->label('Студент')
                    ->options(User::pluck('name', 'id'))
                    ->searchable()
                    ->required(),

                Select::make('room_id')
                    ->label('Комната')
                    ->options(function () {
                        return \App\Models\Room::where('reserve_status', false)
                            ->pluck('room_number', 'id');
                    })
                    ->searchable()
                    ->required()
                    ->helperText('Выберите только из обычных (не резервных) комнат'),

                TextInput::make('city')
                    ->label('Город проживания')
                    ->required()
                    ->maxLength(255),

                Select::make('privileges')
                    ->label('Льготы')
                    ->options([
                        'large_family' => 'Многодетная семья',
                        'orphan' => 'Сирота',
                        'disabled' => 'Инвалидность',
                    ])
                    ->nullable(),

                FileUpload::make('attached_files')
                    ->label('Прикреплённые файлы')
                    ->multiple()
                    ->nullable(),

                Select::make('status')
                    ->label('Статус заявки')
                    ->options([
                        'pending' => 'В ожидании',
                        'approved' => 'Одобрено',
                        'rejected' => 'Отклонено',
                    ])
                    ->default('pending')
                    ->required(),

                Select::make('payment_status')
                    ->label('Статус оплаты')
                    ->options([
                        'pending' => 'Ожидается',
                        'paid' => 'Оплачено',
                        'failed' => 'Ошибка оплаты',
                    ])
                    ->default('pending')
                    ->required(),

                Toggle::make('contract_signed')
                    ->label('Договор подписан')
                    ->default(false),

                ViewField::make('payment_qr')
                    ->label('Kaspi QR-код')
                    ->view('admin.partials.kaspi_qr'),
            ]);

    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),
                TextColumn::make('user.name')->label('Студент')->sortable()->searchable(),
                TextColumn::make('room.room_number')->label('Номер комнаты')->sortable(),
                TextColumn::make('city')->label('Город')->sortable(),
                TextColumn::make('privileges')->label('Льготы')->sortable(),
                TextColumn::make('status')->label('Статус')->sortable(),
                TextColumn::make('payment_status')->label('Статус оплаты')->sortable(),
                BooleanColumn::make('contract_signed')->label('Договор подписан'),
                TextColumn::make('payment_qr_url')
                    ->label('Kaspi QR')
                    ->formatStateUsing(fn($state) => $state ? '<a href="'.$state.'" target="_blank">Оплатить</a>' : 'Не сгенерировано')
                    ->html(),
                TextColumn::make('created_at')->label('Создано')->dateTime()->sortable(),
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
            'index' => Pages\ListBookingRequests::route('/'),
            'create' => Pages\CreateBookingRequest::route('/create'),
            'edit' => Pages\EditBookingRequest::route('/{record}/edit'),
        ];
    }
}
