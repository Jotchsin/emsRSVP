<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Middleware\HandleCors;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php', // ✅ API routes
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        /**
         * 🌍 Global middleware (applies everywhere)
         * ⚠️ Put HandleCors at the very top so it executes first
         */
        $middleware->prepend([
            HandleCors::class, // ✅ ensures CORS headers before anything else
        ]);

        /**
         * 🔑 API middleware group
         * - Sanctum handles SPA authentication (cookies + CSRF)
         * - Throttle API calls
         */
        $middleware->group('api', [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class, // ✅ Needed for React
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);

        /**
         * 💻 Web middleware group
         * - Handles login, register, logout, csrf-cookie
         */
        $middleware->group('web', [
            \Illuminate\Cookie\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class, // ✅ CSRF protection
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        /**
         * 🏷 Aliases (short names for middleware in routes)
         */
        $middleware->alias([
            'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
        ]);

        /**
         * 🍪 Excluded cookies (not encrypted)
         */
        $middleware->encryptCookies(except: [
            'appearance',
            'sidebar_state',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();
