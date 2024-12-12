<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarouselPhotosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('carousel_photos')->insert(
            [
                [
                    'photoLink' => 'storage/showcase/bunny.jpg',
                    'title' => fake()->unique()->word(),
                ],
                [
                    'photoLink' => 'storage/showcase/halloween prints.png',
                    'title' => fake()->unique()->word(),
                ],
                [
                    'photoLink' => 'storage/showcase/doc.png',
                    'title' => fake()->unique()->word(),
                ],
                [
                    'photoLink' => 'storage/showcase/x-mas prints.png',
                    'title' => fake()->unique()->word(),
                ],
            ]
        );
    }
}
