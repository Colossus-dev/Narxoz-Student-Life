<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AdvisorBookingResource\Pages;
use App\Models\AdvisorBooking;
use App\Models\BookingRequest;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class AdvisorBookingResource extends Resource
{
    protected static ?string $model = AdvisorBooking::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';
    protected static ?string $navigationGroup = 'Эдвайзер';
    protected static ?string $modelLabel = 'Эдвайзерге жазылу';
    protected static ?string $pluralModelLabel = 'Эдвайзерге жазылу';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('user_id')
                ->label('Студент')
                ->relationship('user', 'name')
                ->searchable()
                ->required(),

            Forms\Components\Select::make('school')
                ->label('Школа')
                ->options([
                    'Школа Цифровых Технологии' => 'ШЦТ',
                    'Школа Экономики и Менеджмента' => 'ШЭМ',
                    'Школа права и государственного управления' => 'ШПиГУ',
                    'Гуманитарная школа' => 'Гуманитарная школа',
                    'Narxoz Business School' => 'Narxoz Business School',
                ])
                ->searchable()
                ->required(),

            Forms\Components\Select::make('faculty')
                ->label('Факультет')
                ->options([
                    'Digital Engineering' => 'Digital Engineering',
                    'Digital Management and Design' => 'Digital Management and Design',
                    'Учет и Аудит' => 'Учет и Аудит',
                    'Математика и Статистика' => 'Математика и Статистика',
                    'Менеджмент' => 'Менеджмент',
                    'Экономика' => 'Экономика',
                    'Факультет права' => 'Факультет права',
                    'Маркетинг' => 'Маркетинг',
                    'Государственное управление' => 'Государственное управление',
                ])
                ->searchable()
                ->required(),

            Forms\Components\Textarea::make('description')
                ->label('Описание проблемы')
                ->rows(4)
                ->placeholder('Кратко опишите суть вопроса, чтобы эдвайзер был готов')
                ->required()
                ->nullable(),

            Forms\Components\DatePicker::make('date')
                ->label('Дата')
                ->required(),

            Forms\Components\TextInput::make('time')
                ->label('Время')
                ->required(),

            Select::make('reason')
                ->label('Причина обращения')
                ->options(fn () =>
                \App\Models\AdvisorBooking::query()
                    ->whereNotNull('reason')
                    ->distinct()
                    ->pluck('reason', 'reason')
                )
                ->nullable()
                ->searchable(),


            Forms\Components\Select::make('status')
                ->label('Статус')
                ->options([
                    'новая' => 'новая',
                    'обработано' => 'обработано',
                ])
                ->default('новая')
                ->disabledOn('create')
                ->required(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')->label('Студент')->sortable()->searchable(),
                TextColumn::make('school')->label('Школа')->searchable(),
                TextColumn::make('faculty')->label('Факультет')->searchable(),
                TextColumn::make('date')->label('Дата')->date(),
                TextColumn::make('time')->label('Время'),
                TextColumn::make('description')
                    ->label('Описание')
                    ->limit(50)
                    ->tooltip(fn ($record) => $record->description),
                TextColumn::make('status')
                    ->label('Статус')
                    ->badge()
                    ->color(fn ($record) => $record->status === 'обработано' ? 'success' : 'warning'),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Фильтр по статусу')
                    ->options([
                        'новая' => 'Только новые',
                        'обработано' => 'Обработанные',
                    ]),

                Filter::make('date')
                    ->label('Фильтр по дате')
                    ->form([
                        Forms\Components\DatePicker::make('date_from')->label('с'),
                        Forms\Components\DatePicker::make('date_to')->label('по'),
                    ])
                    ->query(function (Builder $query, array $data) {
                        return $query
                            ->when($data['date_from'], fn ($q) => $q->whereDate('date', '>=', $data['date_from']))
                            ->when($data['date_to'], fn ($q) => $q->whereDate('date', '<=', $data['date_to']));
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\Action::make('markAsDone')
                    ->label('✅ Обработано')
                    ->color('success')
                    ->visible(fn ($record) => $record->status !== 'обработано')
                    ->requiresConfirmation()
                    ->action(fn ($record) => $record->update(['status' => 'обработано'])),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAdvisorBookings::route('/'),
            'create' => Pages\CreateAdvisorBooking::route('/create'),
            'edit' => Pages\EditAdvisorBooking::route('/{record}/edit'),
        ];
    }
}
