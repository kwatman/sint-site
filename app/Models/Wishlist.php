<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    protected $fillable = [
        'name',
        'municipality',
        'list',
        'comment',
        'accepted_policy',
    ];

    protected $casts = [
        'list' => 'array',
        'accepted_policy' => 'boolean',
    ];
}
