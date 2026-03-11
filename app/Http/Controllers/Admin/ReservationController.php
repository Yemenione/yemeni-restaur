<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::orderBy('date', 'desc')->orderBy('time', 'desc')->get();
        return Inertia::render('Admin/Reservations/Index', [
            'reservations' => $reservations
        ]);
    }

    public function updateStatus(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,confirmed,cancelled'
        ]);

        $reservation->update($validated);

        return redirect()->back()->with('success', 'Reservation status updated.');
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return redirect()->back()->with('success', 'Reservation deleted.');
    }
}
