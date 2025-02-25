<?php


namespace App\Filament\Resources;


use App\Filament\Resources\UserResource\Pages;
use App\Models\Role;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Hash;

class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $navigationIcon = 'heroicon-o-user';
    protected static ?string $navigationGroup = 'User Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label('Full Name')
                    ->required()
                    ->maxLength(255),

                TextInput::make('login')
                    ->label('Login')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),

                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true),

                TextInput::make('password')
                    ->label('Password')
                    ->password()
                    ->maxLength(255)
                    ->required(fn ($context) => $context === 'create')
                    ->dehydrateStateUsing(fn ($state) => Hash::make($state)),

                Select::make('gender')
                    ->label('Gender')
                    ->options([
                        'male' => 'Male',
                        'female' => 'Female',
                    ])
                    ->required(),

                TextInput::make('gpa')
                    ->label('GPA')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(4)
                    ->step(0.01)
                    ->nullable(),

                DatePicker::make('birthday')
                    ->label('Birthday')
                    ->required(),

                DatePicker::make('admission')
                    ->label('Admission Date')
                    ->required(),

                DatePicker::make('completion')
                    ->label('Completion Date')
                    ->required(),

                Select::make('role_id')
                    ->label('Role')
                    ->options(Role::pluck('name', 'id'))
                    ->searchable()
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),
                TextColumn::make('name')->searchable()->label('Full Name'),
                TextColumn::make('login')->searchable()->label('Login'),
                TextColumn::make('email')->searchable(),
                TextColumn::make('gender')->label('Gender')->sortable(),
                TextColumn::make('gpa')->label('GPA')->sortable(),
                TextColumn::make('birthday')->label('Birthday')->date()->sortable(),
                TextColumn::make('admission')->label('Admission Date')->date()->sortable(),
                TextColumn::make('completion')->label('Completion Date')->date()->sortable(),
                TextColumn::make('role.name')->label('Role')->sortable(),
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
