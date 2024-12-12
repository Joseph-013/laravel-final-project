<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderFiles;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Omitted cart for now since it's not needed for "manage orders" testing
        $statuses = ['Pending', 'Completed', 'Cancelled'];

        $limit = random_int(5, 20);
        Order::factory()->count($limit)->state(['user_id'=>4, 'status'=>fake()->randomElement($statuses)])->create();
    }
}
