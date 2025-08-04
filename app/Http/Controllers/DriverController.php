<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DriverController extends Controller
{
    /**
     * Display the driver interface.
     */
    public function index()
    {
        // Check if user is driver
        if (!auth()->user() || auth()->user()->role !== 'driver') {
            abort(403, 'Unauthorized');
        }
        $driver = auth()->user();
        $currentOrder = $driver->driverOrders()
            ->whereIn('status', ['assigned', 'in_progress'])
            ->with('user')
            ->first();
        
        return Inertia::render('driver/index', [
            'driver' => $driver,
            'currentOrder' => $currentOrder,
        ]);
    }

    /**
     * Update driver status.
     */
    public function store(Request $request)
    {
        // Check if user is driver
        if (!auth()->user() || auth()->user()->role !== 'driver') {
            abort(403, 'Unauthorized');
        }
        $validated = $request->validate([
            'action' => 'required|in:start,finish',
        ]);

        $driver = auth()->user();

        if ($validated['action'] === 'start') {
            $driver->update(['status' => 'on_road']);
            
            // Update current order to in_progress
            $currentOrder = $driver->driverOrders()
                ->where('status', 'assigned')
                ->first();
            
            if ($currentOrder) {
                $currentOrder->update(['status' => 'in_progress']);
            }
        } else {
            $driver->update(['status' => 'ready']);
            
            // Complete current order
            $currentOrder = $driver->driverOrders()
                ->where('status', 'in_progress')
                ->first();
            
            if ($currentOrder) {
                $currentOrder->update(['status' => 'completed']);
            }
        }

        return redirect()->back()->with('success', 'Status updated successfully!');
    }
}