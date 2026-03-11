<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Reservation;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_dishes' => Menu::count(),
                'pending_reservations' => Reservation::where('status', 'pending')->count(),
                'total_reservations' => Reservation::count(),
            ],
            'recent_reservations' => Reservation::orderBy('created_at', 'desc')->take(5)->get()
        ]);
    }
}
