<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'status' => 'offline',
        ]);

        // Create driver users
        User::factory()->create([
            'name' => 'Driver One',
            'email' => 'driver1@example.com',
            'password' => Hash::make('password'),
            'role' => 'driver',
            'status' => 'ready',
        ]);

        User::factory()->create([
            'name' => 'Driver Two',
            'email' => 'driver2@example.com',
            'password' => Hash::make('password'),
            'role' => 'driver',
            'status' => 'on_road',
        ]);

        // Create regular users
        $users = User::factory(5)->create([
            'role' => 'user',
            'status' => 'offline',
        ]);

        // Create sample orders
        Order::factory(10)->create([
            'user_id' => $users->random()->id,
        ]);
    }
}
