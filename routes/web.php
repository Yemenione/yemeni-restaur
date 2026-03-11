<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/fr');
});

Route::prefix('{locale}')->where(['locale' => '[a-zA-Z]{2}'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Home');
    })->name('home');

    Route::get('/menu', function () {
        return Inertia::render('Menu');
    })->name('menu');

    Route::get('/story', function () {
        return Inertia::render('Story');
    })->name('story');

    Route::get('/reservation', function () {
        return Inertia::render('Reservation');
    })->name('reservation');
});

// Sitemap
Route::get('/sitemap.xml', [App\Http\Controllers\SitemapController::class, 'index'])->name('sitemap');

// Admin Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    
    // Menu Management
    Route::prefix('menu')->name('menu.')->group(function () {
        Route::get('/', [App\Http\Controllers\Admin\MenuController::class, 'index'])->name('index');
        Route::get('/create', [App\Http\Controllers\Admin\MenuController::class, 'create'])->name('create');
        Route::post('/', [App\Http\Controllers\Admin\MenuController::class, 'store'])->name('store');
        Route::get('/{menu}/edit', [App\Http\Controllers\Admin\MenuController::class, 'edit'])->name('edit');
        Route::put('/{menu}', [App\Http\Controllers\Admin\MenuController::class, 'update'])->name('update');
        Route::delete('/{menu}', [App\Http\Controllers\Admin\MenuController::class, 'destroy'])->name('destroy');
    });

    // Reservation Management
    Route::prefix('reservations')->name('reservations.')->group(function () {
        Route::get('/', [App\Http\Controllers\Admin\ReservationController::class, 'index'])->name('index');
        Route::patch('/{reservation}/status', [App\Http\Controllers\Admin\ReservationController::class, 'updateStatus'])->name('status.update');
        Route::delete('/{reservation}', [App\Http\Controllers\Admin\ReservationController::class, 'destroy'])->name('destroy');
    });

    // Category Management
    Route::prefix('categories')->name('categories.')->group(function () {
        Route::get('/', [App\Http\Controllers\Admin\CategoryController::class, 'index'])->name('index');
        Route::post('/', [App\Http\Controllers\Admin\CategoryController::class, 'store'])->name('store');
        Route::put('/{category}', [App\Http\Controllers\Admin\CategoryController::class, 'update'])->name('update');
        Route::delete('/{category}', [App\Http\Controllers\Admin\CategoryController::class, 'destroy'])->name('destroy');
    });

    // Setting Management
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/', [App\Http\Controllers\Admin\SettingsController::class, 'index'])->name('index');
        Route::post('/', [App\Http\Controllers\Admin\SettingsController::class, 'update'])->name('update');
    });
});

// Public API Data Routes
Route::get('/api/menu-items', [App\Http\Controllers\PublicDataController::class, 'getMenu'])->name('api.menu');
Route::get('/api/categories', function() {
    return response()->json(App\Models\Category::all());
})->name('api.categories');
Route::get('/api/settings', function() {
    return response()->json(App\Models\Setting::all()->pluck('value', 'key'));
})->name('api.settings');
Route::post('/api/reservations', [App\Http\Controllers\PublicDataController::class, 'storeReservation'])->name('api.reservation.store');
