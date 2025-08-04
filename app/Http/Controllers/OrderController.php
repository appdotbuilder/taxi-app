<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Check if user is admin
        if (!auth()->user() || auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }
        $orders = Order::with(['user', 'driver'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $order = Order::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Order placed successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        // Check if user is admin
        if (!auth()->user() || auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }
        $order->load(['user', 'driver']);
        
        return Inertia::render('orders/show', [
            'order' => $order
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        // Check if user is admin
        if (!auth()->user() || auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }
        $validated = $request->validate([
            'status' => 'required|in:pending,assigned,in_progress,completed,cancelled',
            'driver_id' => 'nullable|exists:users,id',
        ]);

        $order->update($validated);

        // If order is assigned, update driver status
        if ($validated['status'] === 'assigned' && $validated['driver_id']) {
            User::where('id', $validated['driver_id'])->update(['status' => 'on_road']);
        }

        return redirect()->back()->with('success', 'Order updated successfully!');
    }
}