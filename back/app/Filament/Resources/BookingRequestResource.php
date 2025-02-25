<?php
namespace App\Filament\Resources;

use App\Filament\Resources\BookingRequestResource\Pages;
use App\Models\BookingRequest;
use App\Models\Room;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
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
    protected static ?string $navigationGroup = 'Dormitory Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_id')
                    ->label('Student')
                    ->options(User::pluck('name', 'id'))
                    ->searchable()
                    ->required(),

                Select::make('room_id')
                    ->label('Room')
                    ->options(Room::pluck('room_number', 'id'))
                    ->searchable()
                    ->required(),

                TextInput::make('city')
                    ->label('City of Residence')
                    ->required()
                    ->maxLength(255),

                Select::make('privileges')
                    ->label('Privileges')
                    ->options([
                        'large_family' => 'Large Family',
                        'orphan' => 'Orphan',
                        'disabled' => 'Disabled',
                    ])
                    ->nullable(),

                FileUpload::make('attached_files')
                    ->label('Attached Files')
                    ->multiple()
                    ->nullable(),

                Select::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                    ])
                    ->default('pending')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),
                TextColumn::make('user.name')->label('Student')->sortable()->searchable(),
                TextColumn::make('room.room_number')->label('Room Number')->sortable(),
                TextColumn::make('city')->label('City')->sortable(),
                TextColumn::make('privileges')->label('Privileges')->sortable(),
                TextColumn::make('status')->label('Status')->sortable(),
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
            'index' => Pages\ListBookingRequests::route('/'),
            'create' => Pages\CreateBookingRequest::route('/create'),
            'edit' => Pages\EditBookingRequest::route('/{record}/edit'),
        ];
    }
}
