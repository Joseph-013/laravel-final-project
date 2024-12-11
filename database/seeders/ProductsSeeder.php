<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'Bag Tags',
                'description' => 'Customized tags for bags and personal belongings.',
                'keyword' => 'bag-tags',
            ],
            [
                'name' => 'Brochures',
                'description' => 'Professionally designed and printed brochures.',
                'keyword' => 'brochures',
            ],
            [
                'name' => 'Business Cards',
                'description' => 'High-quality business cards for professionals.',
                'keyword' => 'business-cards',
            ],
            [
                'name' => 'Comb Binding',
                'description' => 'Comb binding services for booklets and documents.',
                'keyword' => 'comb-binding',
            ],
            [
                'name' => 'Document Printing',
                'description' => 'Printing and duplication of various documents.',
                'keyword' => 'documents',
            ],
            [
                'name' => 'Flyers',
                'description' => 'Eye-catching flyers for promotions and events.',
                'keyword' => 'flyers',
            ],
            [
                'name' => 'Gift Tags',
                'description' => 'Personalized gift tags for all occasions.',
                'keyword' => 'gift-tags',
            ],
            [
                'name' => 'ID Photo Printing',
                'description' => 'Professional ID photo services.',
                'keyword' => 'id-photos',
            ],
            [
                'name' => 'Lamination',
                'description' => 'Document lamination services for durability.',
                'keyword' => 'lamination',
            ],
            [
                'name' => 'Cup Sleeves',
                'description' => 'Aesthetic cup sleeves for event.',
                'keyword' => 'cup-sleeves',
            ],
            [
                'name' => 'Magnets',
                'description' => 'Custom-printed magnets for home and office.',
                'keyword' => 'magnets',
            ],
            [
                'name' => 'Notepads',
                'description' => 'Personalized notepads for businesses or gifts.',
                'keyword' => 'notepads',
            ],
            [
                'name' => 'Photocards',
                'description' => 'Photo cards for invitations or keepsakes.',
                'keyword' => 'photocards',
            ],
            [
                'name' => 'Picture Printing',
                'description' => 'Printed pictures in various sizes and styles.',
                'keyword' => 'pictures',
            ],
            [
                'name' => 'Prescription Pads',
                'description' => 'Customized prescription pads for medical use.',
                'keyword' => 'prescription-pads',
            ],
            [
                'name' => 'PVC ID',
                'description' => 'High-quality PVC ID cards.',
                'keyword' => 'pvc-id',
            ],
            [
                'name' => 'Stickers',
                'description' => 'Custom-designed stickers for branding or decor.',
                'keyword' => 'stickers',
            ],
            [
                'name' => 'Tent Cards',
                'description' => 'Tent cards for table displays and events.',
                'keyword' => 'tent-cards',
            ],
            [
                'name' => 'Miscellaneous',
                'description' => 'Miscellaneous printing services for unique needs.',
                'keyword' => 'misc',
            ],
        ]);
    }
}
