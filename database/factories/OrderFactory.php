<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Order>
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_name' => fake()->name(),
            'destination' => fake()->address(),
            'reason' => fake()->randomElement([
                'Airport pickup',
                'Doctor appointment',
                'Business meeting',
                'Shopping trip',
                'Family visit',
                'Emergency transport',
            ]),
            'order_time' => fake()->dateTimeBetween('now', '+7 days'),
            'status' => fake()->randomElement(['pending', 'assigned', 'in_progress', 'completed']),
            'user_id' => User::factory(),
        ];
    }
}