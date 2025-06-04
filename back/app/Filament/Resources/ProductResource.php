<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\FileUpload;



class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';
    protected static ?string $navigationGroup = 'Narxoz Shop';
    protected static ?string $modelLabel = 'Товарлар';
    protected static ?string $pluralModelLabel = 'Товарлар';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label('Название')
                    ->required()
                    ->maxLength(255),

                TextInput::make('price')
                    ->label('Цена')
                    ->numeric()
                    ->required(),

                Select::make('category')
                    ->label('Категория')
                    ->options([
                        'Одежда' => 'Одежда',
                        'Аксессуары' => 'Аксессуары',
                        'Канцелярия' => 'Канцелярия',
                    ])
                    ->required(),

                FileUpload::make('image')
                    ->label('Изображение')
                    ->image()
                    ->imageEditor()
                    ->directory('products')
                    ->required()
                    ->columnSpanFull(),

                CheckboxList::make('sizes')
                    ->label('Доступные размеры')
                    ->options([
                        'S' => 'S',
                        'M' => 'M',
                        'L' => 'L',
                        'XL' => 'XL',
                        'XXL' => 'XXL',
                        'XXXL' => 'XXXL',
                    ])
                    ->columns(3)
                    ->required()

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')->label('Фото')->circular()->height(50)->disk('public') // ← обязательно
                ,
                TextColumn::make('name')->label('Название')->searchable(),
                TextColumn::make('category')->label('Категория'),
                TextColumn::make('price')->label('Цена')->sortable(),
                TextColumn::make('sizes')->label('Размеры')->formatStateUsing(fn ($state) => is_array($state) ? implode(', ', $state) : '-'),
            ])
            ->filters([])
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
