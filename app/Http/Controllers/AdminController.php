<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        // Check if user is admin
        if (!auth()->user() || auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }
        $drivers = User::where('role', 'driver')->get();
        $orders = Order::with(['user', 'driver'])->latest()->take(10)->get();
        $stats = [
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'active_drivers' => User::where('role', 'driver')->where('status', 'ready')->count(),
            'busy_drivers' => User::where('role', 'driver')->where('status', 'on_road')->count(),
        ];
        
        return Inertia::render('admin/index', [
            'drivers' => $drivers,
            'orders' => $orders,
            'stats' => $stats,
        ]);
    }

    /**
     * Update driver status.
     */
    public function store(Request $request)
    {
        // Check if user is admin
        if (!auth()->user() || auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }
        $validated = $request->validate([
            'driver_id' => 'required|exists:users,id',
            'action' => 'required|in:approve,reset',
        ]);

        $driver = User::findOrFail($validated['driver_id']);

        if ($validated['action'] === 'approve') {
            $driver->update(['status' => 'on_road']);
        } else {
            $driver->update(['status' => 'ready']);
        }

        return redirect()->back()->with('success', 'Driver status updated successfully!');
    }
}