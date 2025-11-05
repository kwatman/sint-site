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
            'municipality' => ['required', 'string', 'max:255'],
            'accepted_policy' => ['accepted'],
            'items' => ['required', 'array'],
            'items.*.name' => ['string', 'max:255'],
        ]);

        $items = collect($data['items'] ?? [])
            ->pluck('name')
            ->map(fn ($v) => is_string($v) ? trim($v) : $v)
            ->filter(fn ($v) => filled($v))
            ->values()
            ->all();

        if (count($items) === 0) {
            return back()->withErrors([
                'items' => 'Voeg minstens één wens toe.'
            ])->withInput();
        }

        Wishlist::create([
            'name' => $data['name'],
            'municipality' => $data['municipality'],
            'list' => $items,
            'accepted_policy' => (bool) ($data['accepted_policy'] ?? false),
        ]);

        return redirect()->back()->with('success', 'Wishlist opgeslagen.');
    }
}
