<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description"
        content="Yemeni Restaurant Paris - The ultimate authentic luxury dining experience. Savour legendary Mandi, Fahsa, and Saltah in the heart of Paris. Authentic Gulf & Yemeni Cuisine.">
    <meta name="keywords"
        content="Yemeni Restaurant Paris, Authentic Yemeni Food, Mandi Paris, Kabsa, Fahsa, Saltah, Arabic Restaurant Paris, Middle Eastern Cuisine France, Halal Luxury Dining, Gulf Restaurant Paris, Yemeni Gastronomy, Cuisine du Yémen, مطعم يمني باريس, مندي باريس, مطعم عربي, مطعم خليجي, Best things to do in Paris, Tourist friendly restaurant Paris, Top rated restaurants Paris for travelers, Unique dining experience Paris, Middle Eastern culture Paris, Arab Heritage France">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="Yemeni Restaurant Paris - Luxury Authentic Dining">
    <meta property="og:description"
        content="The finest Yemeni cuisine in Paris. Discover our traditional Magla dishes and underground-cooked Mandi.">
    <meta property="og:image" content="{{ asset('images/og-image.jpg') }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ url()->current() }}">
    <meta property="twitter:title" content="Yemeni Restaurant Paris - Luxury Authentic Dining">
    <meta property="twitter:description"
        content="The finest Yemeni cuisine in Paris. Discover our traditional Magla dishes and underground-cooked Mandi.">
    <meta property="twitter:image" content="{{ asset('images/og-image.jpg') }}">

    <link rel="alternate" hreflang="en" href="{{ url('/en') }}">
    <link rel="alternate" hreflang="fr" href="{{ url('/fr') }}">
    <link rel="alternate" hreflang="ar" href="{{ url('/ar') }}">
    <link rel="alternate" hreflang="es" href="{{ url('/es') }}">
    <link rel="alternate" hreflang="x-default" href="{{ url('/fr') }}">

    <link rel="icon" type="image/png" href="/favicon.png">
    <title inertia>{{ config('app.name', 'YEMENI') }}</title>
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead

    <!-- JSON-LD Structured Data for Google -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Yemeni Restaurant Paris",
        "alternateName": ["مطعم يمني باريس", "Restaurant Yéménite Paris"],
        "image": [
            "{{ asset('images/fahsa.png') }}",
            "{{ asset('images/mandi.png') }}",
            "{{ asset('images/saltah.png') }}"
        ],
        "url": "{{ url('/') }}",
        "telephone": "+33123456789",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Paris, France",
            "addressLocality": "Paris",
            "postalCode": "75000",
            "addressCountry": "FR"
        },
        "servesCuisine": ["Yemeni", "Middle Eastern", "Arabic", "Mandi", "Halal"],
        "priceRange": "$$",
        "openingHours": "Mo-Su 12:00-23:00",
        "description": "Authentic Yemeni and Gulf cuisine in the heart of Paris. Featuring legendary Mandi, Fahsa, and traditional Stone Pot dining."
    }
    </script>
</head>

<body class="font-sans antialiased bg-charcoal text-white">
    @inertia
</body>

</html>