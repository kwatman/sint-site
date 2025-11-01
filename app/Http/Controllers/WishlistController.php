<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'items' => ['nullable', 'array'],
            'items.*.name' => ['nullable', 'string', 'max:255'],
        ]);

        $items = collect($data['items'] ?? [])
            ->pluck('name')
            ->filter(fn ($v) => filled($v))
            ->values()
            ->all();

        Wishlist::create([
            'name' => $data['name'],
            'list' => $items,
            'accepted_policy' => true,
        ]);

        return redirect()->back()->with('success', 'Wishlist opgeslagen.');
    }
}

