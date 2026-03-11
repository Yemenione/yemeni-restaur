<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name_en' => 'Main Dishes', 'name_ar' => 'الأطباق الرئيسية', 'slug' => 'main'],
            ['name_en' => 'Starters', 'name_ar' => 'المقبلات', 'slug' => 'starters'],
            ['name_en' => 'Desserts', 'name_ar' => 'الحلويات', 'slug' => 'desserts'],
            ['name_en' => 'Drinks', 'name_ar' => 'المشروبات', 'slug' => 'drinks'],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['slug' => $cat['slug']], $cat);
        }
    }
}
