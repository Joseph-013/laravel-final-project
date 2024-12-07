<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'username' => 'seph',
            'fullname' => 'Joseph Victor Paduga',
            'email' => 'sephpaduga@gmail.com',
            'social_username' => 'JVpaduga',
            'contact_number' => '09150054673',
            'primary_address' => '1621 Piy Margal St, 478 Z-47, Manila, 1008 Metro Manila',
            'password' => Hash::make('password'),
        ]);
    }
}
