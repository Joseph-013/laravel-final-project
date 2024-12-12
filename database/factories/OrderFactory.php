<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['Cart', 'Pending', 'Completed', 'Cancelled'];

        return [
            'user_id' => random_int(1,4),
                'product_id' => random_int(1, 5),
                'specifications' => fake()->sentence(),
                'quantity' => random_int(1, 10),
                'address'=>'Paranaque',
                'order_deadline_date' => fake()->date(),
                'order_deadline_time' => fake()->time(),
                'pickup_type' => fake()->randomElement(['Pickup', 'Delivery']),
                'status' => fake()->randomElement($statuses),
        ];
    }
}
