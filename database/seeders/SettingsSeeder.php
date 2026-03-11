<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'YEMENI RESTAURANT', 'group' => 'general'],
            ['key' => 'logo_type', 'value' => 'text', 'group' => 'branding'],
            ['key' => 'logo_image', 'value' => '/images/logo.png', 'group' => 'branding'],
            ['key' => 'favicon_url', 'value' => '/favicon.png', 'group' => 'branding'],
            ['key' => 'meta_description', 'value' => 'Experience the authentic taste of Yemen in a luxury cinematic setting in Paris.', 'group' => 'seo'],
        ];

        foreach ($settings as $s) {
            Setting::updateOrCreate(['key' => $s['key']], $s);
        }
    }
}
