<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class TaxiApplicationTest extends TestCase
{
    use RefreshDatabase;

    public function test_welcome_page_displays_correctly(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('welcome')
        );
    }

    public function test_guest_can_place_order(): void
    {
        $orderData = [
            'customer_name' => 'John Doe',
            'destination' => '123 Main Street',
            'reason' => 'Airport pickup',
            'order_time' => now()->addHours(2)->format('Y-m-d\TH:i'),
        ];

        $response = $this->post(route('orders.store'), $orderData);

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', [
            'customer_name' => 'John Doe',
            'destination' => '123 Main Street',
            'reason' => 'Airport pickup',
            'status' => 'pending',
        ]);
    }

    public function test_admin_can_access_admin_dashboard(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get(route('admin.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('admin/index')
            ->has('drivers')
            ->has('orders')
            ->has('stats')
        );
    }

    public function test_driver_can_access_driver_dashboard(): void
    {
        $driver = User::factory()->create(['role' => 'driver']);

        $response = $this->actingAs($driver)->get(route('driver.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('driver/index')
            ->has('driver')
        );
    }

    public function test_admin_can_update_driver_status(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $driver = User::factory()->create(['role' => 'driver', 'status' => 'ready']);

        $response = $this->actingAs($admin)->post(route('admin.store'), [
            'driver_id' => $driver->id,
            'action' => 'approve',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', [
            'id' => $driver->id,
            'status' => 'on_road',
        ]);
    }

    public function test_driver_can_start_trip(): void
    {
        $driver = User::factory()->create(['role' => 'driver', 'status' => 'ready']);
        $order = Order::factory()->create([
            'driver_id' => $driver->id,
            'status' => 'assigned',
        ]);

        $response = $this->actingAs($driver)->post(route('driver.store'), [
            'action' => 'start',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', [
            'id' => $driver->id,
            'status' => 'on_road',
        ]);
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'in_progress',
        ]);
    }

    public function test_driver_can_finish_trip(): void
    {
        $driver = User::factory()->create(['role' => 'driver', 'status' => 'on_road']);
        $order = Order::factory()->create([
            'driver_id' => $driver->id,
            'status' => 'in_progress',
        ]);

        $response = $this->actingAs($driver)->post(route('driver.store'), [
            'action' => 'finish',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', [
            'id' => $driver->id,
            'status' => 'ready',
        ]);
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'completed',
        ]);
    }
}