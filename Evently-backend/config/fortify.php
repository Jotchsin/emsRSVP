<?php

use Laravel\Fortify\Features;

return [

    'guard' => 'web',

    'passwords' => 'users',

    'username' => 'email',

    'email' => 'email',

    'lowercase_usernames' => true,

    'home' => '/dashboard',

    'prefix' => '',

    'domain' => null,

    'middleware' => ['web'],

    'limiters' => [
        'login' => 'login',
        'two-factor' => 'two-factor',
    ],

    // ❌ set to false because we don’t need Blade views (SPA + React)
    'views' => false,

    'features' => [
        // ✅ Enable user registration
        Features::registration(),

        // ✅ Enable password resets (optional but useful)
        Features::resetPasswords(),

        // ✅ Enable login & profile updates (optional)
        Features::updateProfileInformation(),
        Features::updatePasswords(),

        // ❌ Keep email verification optional, enable if you need
        // Features::emailVerification(),

        // ✅ Keep 2FA if you want it
        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => true,
        ]),
    ],

];
