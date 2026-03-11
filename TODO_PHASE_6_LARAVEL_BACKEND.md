# Laravel Backend Tasks

## Database & Models
- [x] Create `Menu` Model & Migration
    - [x] Define multi-language titles.
    - [x] Define multi-language descriptions.
    - [x] Add price, category, image_url.
- [x] Create `Reservation` Model & Migration
    - [x] Add name, email, phone, date, time, guests, special_requests.
- [x] Run `php artisan migrate`.

## Localization (i18n)
- [x] Publish Laravel `lang` directories.
- [x] Create JSON translation files for EN, FR, AR, ES.
- [x] Install `inertiajs/inertia-laravel`.
- [x] Register `HandleInertiaRequests` middleware to serve `$translations` object.
- [x] Create React `useTranslations` hook for the frontend.
- [x] Setup `routes/web.php` localized redirecting and routing.
