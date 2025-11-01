<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WishlistController;

Route::get('/', function () {
    return Inertia::render('Wishlist');
});

Route::post('/wishlist', [WishlistController::class, 'store'])->name('wishlist.store');
