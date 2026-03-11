<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = [
        'title_en', 'title_fr', 'title_ar', 'title_es',
        'description_en', 'description_fr', 'description_ar', 'description_es',
        'price', 'category', 'image_url'
    ];
}
