<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $locales = ['en', 'fr', 'ar', 'es'];
        $pages = ['', '/menu', '/story', '/reservation'];
        
        $urls = [];
        foreach ($locales as $locale) {
            foreach ($pages as $page) {
                $urls[] = url("/{$locale}{$page}");
            }
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
        
        foreach ($urls as $url) {
            $xml .= '<url>';
            $xml .= '<loc>' . $url . '</loc>';
            $xml .= '<lastmod>' . now()->tz('UTC')->toAtomString() . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>0.8</priority>';
            $xml .= '</url>';
        }
        
        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml'
        ]);
    }
}
