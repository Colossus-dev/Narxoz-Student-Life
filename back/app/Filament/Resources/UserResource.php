<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\Role;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Illuminate\Support\Facades\Hash;

class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $navigationIcon = 'heroicon-o-user';
    protected static ?string $navigationGroup = 'Управление Пользователями';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label('ФИО')
                    ->required()
                    ->maxLength(255),

                TextInput::make('login')
                    ->label('Логин')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),

                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true),

                TextInput::make('password')
                    ->label('Пароль')
                    ->password()
                    ->maxLength(255)
                    ->required(fn ($context) => $context === 'create')
                    ->dehydrateStateUsing(fn ($state) => Hash::make($state)),

                Select::make('gender')
                    ->label('Пол')
                    ->options([
                        'male' => 'Мужской',
                        'female' => 'Женский',
                    ])
                    ->required(),

                TextInput::make('gpa')
                    ->label('Средний балл (GPA)')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(4)
                    ->step(0.01)
                    ->nullable(),

                TextInput::make('phone')
                    ->label('Телефон')
                    ->tel(),

                FileUpload::make('avatar')
                    ->label('Фото профиля')
                    ->image()
                    ->imageEditor()
                    ->directory('avatars') // Сохраняется в storage/app/public/avatars
                    ->columnSpanFull(),

                Select::make('faculty')
                    ->label('Факультет')
                    ->options([
                        'Digital Engineering' => 'Цифровая инженерия',
                        'Digital Management and Design' => 'Цифровой менеджмент и дизайн',
                        'Право' => 'Право',
                        'Менеджмент' => 'Менеджмент',
                        'Кибербезопасность' => 'Кибербезопасность',
                        'Экономика' => 'Экономика',
                        'Математика и Статистика' => 'Математика и Статистика',
                    ])
                    ->required(),

                DatePicker::make('birthday')
                    ->label('Дата рождения')
                    ->required(),

                DatePicker::make('admission')
                    ->label('Дата поступления')
                    ->required(),

                DatePicker::make('completion')
                    ->label('Дата окончания')
                    ->required(),

                Select::make('role_id')
                    ->label('Роль')
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
                TextColumn::make('name')->searchable()->label('ФИО'),
                TextColumn::make('login')->searchable()->label('Логин'),
                TextColumn::make('email')->searchable()->label('Email'),
                TextColumn::make('gender')->label('Пол')->sortable(),
                TextColumn::make('gpa')->label('GPA')->sortable(),
                TextColumn::make('birthday')->label('Дата рождения')->date()->sortable(),
                TextColumn::make('phone')->label('Телефон'),
                ImageColumn::make('avatar')->label('Аватар')->circular(), // круглое фото
                TextColumn::make('faculty')->label('Факультет')->sortable(),
                TextColumn::make('admission')->label('Дата поступления')->date()->sortable(),
                TextColumn::make('completion')->label('Дата окончания')->date()->sortable(),
                TextColumn::make('role.name')->label('Роль')->sortable(),
                TextColumn::make('created_at')->label('Создано')->dateTime()->sortable(),
            ])
            ->filters([])
            ->actions([
                EditAction::make()->label('Редактировать'),
                DeleteAction::make()->label('Удалить'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()->label('Удалить выбранное'),
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
