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
        User::updateOrCreate(
            ['email' => 'admin@yemenirestaurant.fr'],
            [
                'name' => 'Admin',
                'password' => bcrypt('Admin123@19'),
            ]
        );

        $this->call([
            MenuDataSeeder::class,
            SettingsSeeder::class,
        ]);
    }
}
