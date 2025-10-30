<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | This defines which origins, methods, and headers can interact with
    | your API. Since you are using a React SPA with Sanctum, you must
    | allow credentials and explicitly list your frontend origin.
    |
    */

    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
        'login',
        'logout',
        'register',
        'user',
    ],

    // ✅ Explicit methods instead of wildcard (*)
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    // ✅ Only allow your frontend origin
    'allowed_origins' => [
        'http://localhost:3000',
    ],

    'allowed_origins_patterns' => [],

    // ✅ Allow all headers (important for XSRF-TOKEN)
    'allowed_headers' => ['*'],

    // ✅ You don’t need exposed headers usually, but keep empty
    'exposed_headers' => [],

    // ✅ Cache preflight requests for performance
    'max_age' => 3600,

    // ✅ Must be true for Sanctum with cookies
    'supports_credentials' => true,
];
