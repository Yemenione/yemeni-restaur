<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->segment(1);

        if (in_array($locale, ['en', 'fr', 'ar', 'es'])) {
            app()->setLocale($locale);
            session()->put('locale', $locale);
        } else {
            // Check session or default
            $currentLocale = session()->get('locale', 'fr');
            app()->setLocale($currentLocale);
        }

        return $next($request);
    }
}
