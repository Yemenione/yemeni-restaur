<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicDataController extends Controller
{
    /**
     * Fetch all menu items for the dynamic menu component.
     */
    public function getMenu()
    {
        return response()->json(Menu::all());
    }

    /**
     * Handle public reservation submissions.
     */
    public function storeReservation(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2',
            'email' => 'required|email',
            'date' => 'required|date',
            'guests' => 'required|integer|min:1|max:20',
            'message' => 'nullable|string',
        ]);

        // Default status is pending
        $validated['status'] = 'pending';
        // Add current time as placeholder if not provided in form
        $validated['time'] = date('H:i'); 

        Reservation::create($validated);

        return response()->json(['success' => true]);
    }
}
