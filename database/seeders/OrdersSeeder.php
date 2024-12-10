<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['Cart', 'Pending', 'Completed', 'Cancelled'];

        $products = Product::all();
        $users = User::all();

        foreach ($users as $user) {
            for ($i = 0; $i < 10; $i++) {
                $randomProduct = $products->random();

                Order::create([
                    'user_id' => $user->id,
                    'product_id' => $randomProduct->id,
                    'specifications' => fake()->sentence(),
                    'files' => json_encode([fake()->word() . '.jpg', fake()->word() . '.pdf']),
                    'quantity' => random_int(1, 10),
                    'order_deadline_date' => fake()->date(),
                    'order_deadline_time' => fake()->time(),
                    'pickup_type' => fake()->randomElement(['Pickup', 'Delivery']),
                    'status' => fake()->randomElement($statuses),
                ]);
            }
        }
    }
}
