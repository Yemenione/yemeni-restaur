<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dishes = [
            [
                'title_en' => 'Saltah',
                'title_ar' => 'سلتة',
                'description_en' => 'The national dish of Yemen. A rich stew with vegetables and meat, topped with fenugreek froth.',
                'description_ar' => 'الطبق الوطني اليمني، مرق غني بالخضار واللحم يعلوه الحلبة المخفوقة.',
                'price' => 24.00,
                'category' => 'main',
                'image_url' => '/images/saltah.png'
            ],
            [
                'title_en' => 'Fahsa',
                'title_ar' => 'فحسة',
                'description_en' => 'Slow-cooked beef shredded into a boiling stone pot of spicy gravy.',
                'description_ar' => 'لحم بقري مطهو ببطء حتى الذوبان، يُقدم في مقلى صخري يغلي.',
                'price' => 26.00,
                'category' => 'main',
                'image_url' => '/images/fahsa.png'
            ],
            [
                'title_en' => 'Mandi',
                'title_ar' => 'مندي',
                'description_en' => 'Lamb cooked in a traditional underground pit, served with saffron basmati rice.',
                'description_ar' => 'لحم مطهو في أفران تقليدية تحت الأرض، يُقدم مع أرز بسمتي بالزعفران.',
                'price' => 32.00,
                'category' => 'main',
                'image_url' => '/images/mandi.png'
            ],
            [
                'title_en' => 'Sambousa',
                'title_ar' => 'سمبوسة',
                'description_en' => 'Crispy pastry filled with spiced meat or vegetables.',
                'description_ar' => 'عجينة مقرمشة محشوة باللحم المتبل أو الخضار.',
                'price' => 12.00,
                'category' => 'starters',
                'image_url' => '/images/saltah.png'
            ],
            [
                'title_en' => 'Bint Al Sahn',
                'title_ar' => 'بنت الصحن',
                'description_en' => 'Sweet honey-drenched layered pastry.',
                'description_ar' => 'فطيرة طبقات يمنية مغطاة بالعسل الصافي والسمن.',
                'price' => 14.00,
                'category' => 'desserts',
                'image_url' => '/images/mandi.png'
            ],
        ];

        foreach ($dishes as $dish) {
            Menu::create($dish);
        }
    }
}
