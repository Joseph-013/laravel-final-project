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
            'default_address' => '1621 Piy Margal St, 478 Z-47, Manila, 1008 Metro Manila',
            'password' => Hash::make('password'),
        ]);

        DB::table('users')->insert([
            'username' => 'laur',
            'fullname' => 'Laurence Arvin Arcilla',
            'email' => 'laurence.arcilla@gmail.com',
            'social_username' => 'lrncrcll',
            'role' => 'admin',
            'contact_number' => '09600982833',
            'default_address' => 'Col. Bravo St. Central Signal Village, Taguig City',
            'password' => Hash::make('password'),
        ]);

        DB::table('users')->insert([
            'username' => 'arvin',
            'fullname' => 'Arvin Alkuino',
            'email' => 'arvinalkuino123@gmail.com',
            'social_username' => 'qweqwe',
            'contact_number' => '0958447434',
            'default_address' => 'Col. Bravo St. Central Signal Village, Taguig City',
            'password' => Hash::make('password'),
        ]);
    }
}
