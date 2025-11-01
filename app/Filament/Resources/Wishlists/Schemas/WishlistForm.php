<?php

namespace App\Filament\Resources\Wishlists\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class WishlistForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                Repeater::make('list')
                    ->simple(
                        TextInput::make('item')
                            ->required()
                            ->columnSpanFull()
                    )
                    ->required()
                    ->columnSpanFull(),
                Toggle::make('accepted_policy')
                    ->required(),
            ]);
    }
}
