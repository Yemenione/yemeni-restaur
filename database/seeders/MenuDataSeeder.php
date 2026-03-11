<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Menu;
use Illuminate\Support\Str;

class MenuDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data to avoid duplicates if re-seeding
        Menu::truncate();
        Category::truncate();

        $categories = [
            ['name_en' => 'Fish Dishes', 'name_ar' => 'أطباق السمك', 'slug' => 'fish'],
            ['name_en' => 'Soups', 'name_ar' => 'شوربات', 'slug' => 'soups'],
            ['name_en' => 'Traditional Dishes', 'name_ar' => 'الأطباق التقليدية', 'slug' => 'main'],
            ['name_en' => 'Meat Dishes', 'name_ar' => 'أطباق اللحوم', 'slug' => 'meat'],
            ['name_en' => 'Chicken Dishes', 'name_ar' => 'أطباق الدجاج', 'slug' => 'chicken'],
            ['name_en' => 'Appetizers', 'name_ar' => 'المقبلات', 'slug' => 'starters'],
            ['name_en' => 'Desserts', 'name_ar' => 'الحلويات', 'slug' => 'desserts'],
            ['name_en' => 'Drinks', 'name_ar' => 'المشروبات', 'slug' => 'drinks'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }

        $menuItems = [
            // Fish Dishes
            [
                'category' => 'fish',
                'title_en' => 'Mofa',
                'title_ar' => 'موفا',
                'title_fr' => 'Mofa',
                'description_en' => 'Grilled fish in tannur (pottery) with cheese sauce, potato and salad.',
                'description_ar' => 'سمك مشوي في التنور (الفخار) مع صوص الجبن، بطاطس وسلطة.',
                'description_fr' => 'Poisson grillé au tannur (poterie) sauce fromage, pomme de terre avec salade.',
                'price' => 17.90,
                'image_url' => '/images/saltah.png' // Placeholder, user will update via Admin
            ],
            [
                'category' => 'fish',
                'title_en' => 'Shrimp Sanouna',
                'title_ar' => 'سنونة جمبري',
                'title_fr' => 'Sanouna Crevette',
                'description_en' => 'Shrimp, potato, onion, garlic, coriander, tomato sauce with malouge or rice.',
                'description_ar' => 'جمبري، بطاطس، بصل، ثوم، كزبرة، صوص طماطم مع ملوج أو أرز.',
                'description_fr' => 'Crevettes, pomme de terre, oignon, ail, coriander, sauce tomate avec malouge/riz.',
                'price' => 17.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'fish',
                'title_en' => 'Gombo',
                'title_ar' => 'بامية',
                'title_fr' => 'Gombo',
                'description_en' => 'Okra, onion, garlic, coriander, tomato sauce with malouge or rice.',
                'description_ar' => 'بامية، بصل، ثوم، كزبرة، صوص طماطم مع ملوج أو أرز.',
                'description_fr' => 'Gombos, oignon, ail, coriandre, sauce tomate avec malouge/riz.',
                'price' => 13.90,
                'image_url' => '/images/saltah.png'
            ],

            // Soups
            [
                'category' => 'soups',
                'title_en' => 'Lentils',
                'title_ar' => 'شوربة عدس',
                'title_fr' => 'Lentilles',
                'description_en' => 'Lentils, tomato, garlic, coriander.',
                'description_ar' => 'عدس، طماطم، ثوم، كزبرة.',
                'description_fr' => 'Lentilles, tomate, ail, coriandre.',
                'price' => 5.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'soups',
                'title_en' => 'Marak',
                'title_ar' => 'مرق',
                'title_fr' => 'Marak',
                'description_en' => 'Authentic Yemeni broth.',
                'description_ar' => 'مرق يمني أصيل.',
                'description_fr' => 'Bouillon traditionnel.',
                'price' => 2.90,
                'image_url' => '/images/saltah.png'
            ],

            // Traditional Dishes (Main)
            [
                'category' => 'main',
                'title_en' => 'Saltah',
                'title_ar' => 'سلة',
                'title_fr' => 'Saltah',
                'description_en' => 'Vegetables and fenugrec with malouge bread and sauce.',
                'description_ar' => 'خضار وحلبة مع خبز الملوج والصوص.',
                'description_fr' => 'Légume et fenugrec avec malouge et sauce.',
                'price' => 13.90,
                'image_url' => '/images/saltah_premium.png'
            ],
            [
                'category' => 'main',
                'title_en' => 'Mouchakal',
                'title_ar' => 'مشكل',
                'title_fr' => 'Mouchakal',
                'description_en' => 'Oven-baked potato, tomato, carrot, zucchini, bell pepper, garlic with sauce and malouge or rice.',
                'description_ar' => 'خضار مشكلة في الفرن (بطاطس، طماطم، جزر، كوسة، فلفل، ثوم) مع الصوص وملوج أو أرز.',
                'description_fr' => '(Cuit au four) pomme de terre, tomate, carotte, courgette, poivron, ail, avec sauce et malouge ou riz.',
                'price' => 13.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'main',
                'title_en' => 'Mloukhiya',
                'title_ar' => 'ملوخية',
                'title_fr' => 'Mloukhiya',
                'description_en' => 'Corète, onion, tomato, garlic with sauce and malouge or rice.',
                'description_ar' => 'ملوخية، بصل، طماطم، ثوم مع الصوص وملوج أو أرز.',
                'description_fr' => 'Corète, oignon, tomate, ail avec sauce et malouge ou riz.',
                'price' => 10.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'main',
                'title_en' => 'Foul',
                'title_ar' => 'فول',
                'title_fr' => 'Foul',
                'description_en' => 'Fava beans, tomato, onion, coriander, garlic with sauce.',
                'description_ar' => 'فول، طماطم، بصل، كزبرة، ثوم مع الصوص.',
                'description_fr' => 'Feve, tomate, oignon, coriandre, ail avec sauce.',
                'price' => 9.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'main',
                'title_en' => 'Fassoulia',
                'title_ar' => 'فاصوليا',
                'title_fr' => 'Fassoulia',
                'description_en' => 'Red beans, tomato, onion, coriander, garlic with malouge and sauce.',
                'description_ar' => 'فاصوليا حمراء، طماطم، بصل، كزبرة، ثوم مع ملوج وصوص.',
                'description_fr' => 'Haricot rouge, tomate, oignon, coriandre, ail malouge et sauce.',
                'price' => 9.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'main',
                'title_en' => 'Chouchtouka',
                'title_ar' => 'شكشوكة',
                'title_fr' => 'Chouchtouka',
                'description_en' => 'Eggs, tomato, onion, garlic with malouge and sauce.',
                'description_ar' => 'بيض، طماطم، بصل، ثوم مع ملوج وصوص.',
                'description_fr' => 'Oeufs, tomate, oignon, ail, malouge, et sauce.',
                'price' => 9.90,
                'image_url' => '/images/saltah.png'
            ],

            // Meat Dishes (Meat)
            [
                'category' => 'meat',
                'title_en' => 'Bouram',
                'title_ar' => 'بورم',
                'title_fr' => 'Bouram',
                'description_en' => 'Soup, meat cooked in pottery, rice, grilled vegetables, potato, carrot, zucchini.',
                'description_ar' => 'شوربة، لحم مطهو في الفخار، أرز، خضار مشوية، بطاطس، جزر، كوسة.',
                'description_fr' => 'Soupe, viande cuite en poterie, riz, légumes grillés, pomme de terre, carotte, courgette.',
                'price' => 17.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'meat',
                'title_en' => 'Fahsah',
                'title_ar' => 'فحسة',
                'title_fr' => 'Fahsah',
                'description_en' => 'Meat, tomato, onion, garlic, coriander with malouge bread.',
                'description_ar' => 'لحم، طماطم، بصل، ثوم، كزبرة مع خبز الملوج.',
                'description_fr' => 'Viande, tomate, oignon, ail, coriandre avec malouge.',
                'price' => 14.90,
                'image_url' => '/images/fahsa_premium.png'
            ],
            [
                'category' => 'meat',
                'title_en' => 'Mougalgal',
                'title_ar' => 'مقلقل بجري',
                'title_fr' => 'Mougalgal',
                'description_en' => 'Grilled diced meat, onion, tomato, garlic, bell pepper with malouge.',
                'description_ar' => 'لحم مشوي مقطع صغيراً، بصل، طماطم، ثوم، فلفل مع خبز الملوج.',
                'description_fr' => 'Viande grillée en petits morceaux, oignon, tomate, ail, poivron avec malouge.',
                'price' => 14.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'meat',
                'title_en' => 'Meat Sanouna',
                'title_ar' => 'سنونة لحم',
                'title_fr' => 'Sanouna Viande',
                'description_en' => 'Meat, potato, onion, garlic, coriander, tomato sauce with malouge/rice.',
                'description_ar' => 'لحم، بطاطس، بصل، ثوم، كزبرة، صوص طماطم مع ملوج أو أرز.',
                'description_fr' => 'Viande, pomme de terre, oignon, ail. coriandre, sauce tomate avec malouge/riz.',
                'price' => 14.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'meat',
                'title_en' => 'Kibda',
                'title_ar' => 'كبدة غنم',
                'title_fr' => 'Kibda',
                'description_en' => 'Liver, tomato, onion, coriander with malouge.',
                'description_ar' => 'كبدة، طماطم، بصل، كزبرة مع خبز الملوج.',
                'description_fr' => 'Foie, tomate, oignon, coriandre, avec malouge.',
                'price' => 13.90,
                'image_url' => '/images/saltah.png'
            ],

            // Chicken Dishes (Chicken)
            [
                'category' => 'chicken',
                'title_en' => 'Chicken Mandi',
                'title_ar' => 'مندي دجاج',
                'title_fr' => 'Mandi Poulet',
                'description_en' => 'Traditional mandi rice with succulent chicken.',
                'description_ar' => 'أرز مندي تقليدي مع دجاج فاخر.',
                'description_fr' => 'Riz, poulet.',
                'price' => 16.90,
                'image_url' => '/images/mandi_premium.png'
            ],
            [
                'category' => 'chicken',
                'title_en' => 'Kabssa',
                'title_ar' => 'كبسة',
                'title_fr' => 'Kabssa',
                'description_en' => 'Rice, chicken, onion, raisins, almonds.',
                'description_ar' => 'أرز، دجاج، بصل، زبيب، لوز.',
                'description_fr' => 'Riz, poulet, oignon, raisins secs, amandes.',
                'price' => 15.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'chicken',
                'title_en' => 'Zourbiane',
                'title_ar' => 'زربيان',
                'title_fr' => 'Zourbiane',
                'description_en' => 'Smoked rice, chicken, potato, onion.',
                'description_ar' => 'أرز مدخن، دجاج، بطاطس، بصل.',
                'description_fr' => 'Riz fumé, poulet, pomme de terre, oignon.',
                'price' => 15.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'chicken',
                'title_en' => 'Chicken Sanouna',
                'title_ar' => 'سنونة دجاج',
                'title_fr' => 'Sanouna Poulet',
                'description_en' => 'Chicken, potato, onion, garlic, coriander, tomato sauce with malouge/rice.',
                'description_ar' => 'دجاج، بطاطس، بصل، ثوم، كزبرة، صوص طماطم مع ملوج أو أرز.',
                'description_fr' => 'Poulet, pomme de terre, oignon, ail, coriandre, sauce tomate avec malouge/riz.',
                'price' => 13.90,
                'image_url' => '/images/saltah.png'
            ],

            // Starters (starters)
            [
                'category' => 'starters',
                'title_en' => 'Yemeni Salad',
                'title_ar' => 'سلطة يمنية',
                'title_fr' => 'Salade Yemeni',
                'description_en' => 'Minced meat, salad, tomato, cucumber, onion, sauce.',
                'description_ar' => 'لحم مفروم، سلطة، طماطم، خيار، بصل، صوص.',
                'description_fr' => 'Viande hachée, salade, tomate, concombre, oignon, sauce.',
                'price' => 8.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'starters',
                'title_en' => 'Shrimp Salad',
                'title_ar' => 'سلطة جمبري',
                'title_fr' => 'Salade Crevette',
                'description_en' => 'Shrimp, salad, avocado, tomato, onion, arugula, radish.',
                'description_ar' => 'جمبري، سلطة، أفوكادو، طماطم، بصل، جرجير، فجل.',
                'description_fr' => 'Crevette, salade, avocat, tomate, oignon, roquette, radis.',
                'price' => 8.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'starters',
                'title_en' => 'Chicken Salad',
                'title_ar' => 'سلطة دجاج',
                'title_fr' => 'Salade Poulet',
                'description_en' => 'Chicken, onion, grilled bell pepper, avocado, salad, tomato.',
                'description_ar' => 'دجاج، بصل، فلفل مشوي، أفوكادو، سلطة، طماطم.',
                'description_fr' => 'Poulet, oignon, poivron grillé, avocat, salade, tomate.',
                'price' => 8.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'starters',
                'title_en' => 'Special Salad',
                'title_ar' => 'سلطة خاصة',
                'title_fr' => 'Salade Spéciale',
                'description_en' => 'Arugula, tomato, onion, grilled eggplant, crispy bread.',
                'description_ar' => 'جرجير، طماطم، بصل، باذنجان مشوي، خبز مقرمش.',
                'description_fr' => 'Roquette, tomate, oignon, aubergine grillée, pain croustillant.',
                'price' => 8.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'starters',
                'title_en' => 'Chafoute Sanaani',
                'title_ar' => 'شفوت صنعاني',
                'title_fr' => 'Chafoute Sanaani',
                'description_en' => 'Galette, plain yogurt, garlic, green herbs, salad, tomato, cucumber, onion.',
                'description_ar' => 'لحوح، زبادي، ثوم، أعشاب، سلطة، طماطم، خيار، بصل.',
                'description_fr' => 'Galette, yaourt nature, ail, herbes vertes, salade, tomate, concombre, oignon.',
                'price' => 8.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'starters',
                'title_en' => 'Moutabbale',
                'title_ar' => 'متبل',
                'title_fr' => 'Moutabbale',
                'description_en' => 'Grilled eggplant, sesame cream, garlic, lemon, olive oil.',
                'description_ar' => 'باذنجان مشوي، طحينة، ثوم، ليمون، زيت زيتون.',
                'description_fr' => 'Aubergine grillée, crème de sésame, ail, citron, huile d’olive.',
                'price' => 4.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'starters',
                'title_en' => 'Houmous',
                'title_ar' => 'حمص',
                'title_fr' => 'Houmous',
                'description_en' => 'Chickpea puree, sesame cream, garlic, lemon, olive oil.',
                'description_ar' => 'حمص مطحون، طحينة، ثوم، ليمون، زيت زيتون.',
                'description_fr' => 'Purée de pois chiches, crème de sésame, ail, citron, huile d’olive.',
                'price' => 4.90,
                'image_url' => '/images/saltah.png'
            ],

            // Desserts
            [
                'category' => 'desserts',
                'title_en' => 'Fatah Malaki',
                'title_ar' => 'فتة ملكي',
                'title_fr' => 'Fatah Malaki',
                'description_en' => 'Banana galette, date, mascarpone, honey, nigella seeds.',
                'description_ar' => 'فتة موز، تمر، قشطة، عسل، حبة سوداء.',
                'description_fr' => 'Galette banane, datte, mascarpone, miel, nigelle.',
                'price' => 7.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'desserts',
                'title_en' => 'Royal',
                'title_ar' => 'رويال',
                'title_fr' => 'Royal',
                'description_en' => 'Banana, mango, dried fruits, milk.',
                'description_ar' => 'موز، مانجو، فواكه مجففة، حليب.',
                'description_fr' => 'Banane, mangue, fruits sec, lait.',
                'price' => 6.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'desserts',
                'title_en' => 'Fatah Tamr',
                'title_ar' => 'فتة تمر',
                'title_fr' => 'Fatah Tamr',
                'description_en' => 'Date galette.',
                'description_ar' => 'فتة تمر.',
                'description_fr' => 'Galette de dattes.',
                'price' => 6.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'desserts',
                'title_en' => 'Fatah Mauz',
                'title_ar' => 'فتة موز',
                'title_fr' => 'Fatah Mauz',
                'description_en' => 'Banana galette.',
                'description_ar' => 'فتة موز.',
                'description_fr' => 'Galette de banane.',
                'price' => 6.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'desserts',
                'title_en' => 'Arika',
                'title_ar' => 'عريكة',
                'title_fr' => 'Arika',
                'description_en' => 'Galette, date, mascarpone, nigella seeds, honey.',
                'description_ar' => 'عريكة، تمر، قشطة، حبة سوداء، عسل.',
                'description_fr' => 'Galette, dette, mascarpone, nigelle, miel.',
                'price' => 4.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'desserts',
                'title_en' => 'Masoob',
                'title_ar' => 'معصوب',
                'title_fr' => 'Masoob',
                'description_en' => 'Crushed galette, banana, mascarpone, raisins, almonds.',
                'description_ar' => 'معصوب، موز، قشطة، زبيب، لوز.',
                'description_fr' => 'Galette broyée, banane, mascarpone, raisins sec, amande.',
                'price' => 4.90,
                'image_url' => '/images/saltah.png'
            ],

            // Drinks
            [
                'category' => 'drinks',
                'title_en' => 'Breshed Fruit Juice',
                'title_ar' => 'عصائر طازجة',
                'title_fr' => 'Jus De Fruits Pressés',
                'description_en' => 'Two fruits of your choice.',
                'description_ar' => 'اختيارك من فاكهتين.',
                'description_fr' => 'Deux fruits au choix.',
                'price' => 5.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'drinks',
                'title_en' => 'Mango Juice',
                'title_ar' => 'مانجو',
                'title_fr' => 'Mangue',
                'description_en' => 'Fresh mango juice.',
                'description_ar' => 'عصير مانجو طازج.',
                'description_fr' => 'Jus de mangue.',
                'price' => 4.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'drinks',
                'title_en' => 'Labane',
                'title_ar' => 'لبن',
                'title_fr' => 'Labane',
                'description_en' => 'Traditional yogurt drink.',
                'description_ar' => 'لبن طبيعي.',
                'description_fr' => 'Yaourt traditionnel.',
                'price' => 2.90,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'drinks',
                'title_en' => 'Adani Tea',
                'title_ar' => 'شاي عدني',
                'title_fr' => 'Thé Adani',
                'description_en' => 'Authentic spiced Adani tea.',
                'description_ar' => 'شاي عدني مبخر.',
                'description_fr' => 'Thé Adani épicé.',
                'price' => 2.20,
                'image_url' => '/images/saltah.png'
            ],
            [
                'category' => 'drinks',
                'title_en' => 'Gichr',
                'title_ar' => 'قشر',
                'title_fr' => 'Gichr',
                'description_en' => 'Traditional Yemeni coffee husk tea.',
                'description_ar' => 'قهوة القشر اليمنية المميزة.',
                'description_fr' => 'Boisson au café traditionnelle.',
                'price' => 2.20,
                'image_url' => '/images/saltah.png'
            ],
        ];

        foreach ($menuItems as $item) {
            Menu::create($item);
        }
    }
}
