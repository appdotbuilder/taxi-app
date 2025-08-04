<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public order creation
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            return redirect()->route('admin.index');
        } elseif ($user->isDriver()) {
            return redirect()->route('driver.index');
        }
        
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin routes
    Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('admin.index');
        Route::post('/', [AdminController::class, 'store'])->name('admin.store');
        Route::resource('orders', OrderController::class)->except(['store']);
    });

    // Driver routes
    Route::prefix('driver')->middleware(['auth', 'verified'])->group(function () {
        Route::get('/', [DriverController::class, 'index'])->name('driver.index');
        Route::post('/', [DriverController::class, 'store'])->name('driver.store');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
