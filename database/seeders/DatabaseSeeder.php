<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UsersSeeder::class);
        User::factory(100)->create();
        $this->call(ProductsSeeder::class);
        $this->call(CarouselPhotosSeeder::class);
        // $this->call(OrdersSeeder::class);
        // $this->call(CartsSeeder::class);
    }
}
