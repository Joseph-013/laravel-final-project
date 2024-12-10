<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderFiles;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CartsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = User::find(1);
        $products = Product::all();
        $randomProduct = $products->random();
        $order = Order::create([
            'user_id' => $user1->id,
            'product_id' => $randomProduct->id,
            'specifications' => fake()->sentence(),
            'quantity' => random_int(1, 10),
            'order_deadline_date' => fake()->date(),
            'order_deadline_time' => fake()->time(),
            'pickup_type' => fake()->randomElement(['Pickup', 'Delivery']),
            'status' => 'Cart',
        ]);

        OrderFiles::insert([[
            'order_id' => $order->id,
            'filename' => '54sdf8456wef56123.pdf',
            'created_at' => now(),
            'updated_at' => now(),

        ], [
            'order_id' => $order->id,
            'filename' => 'GYprxlgWYAAAbrJ.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]]);
    }
}
