<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// ✅ Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ✅ Protected routes (require Sanctum auth)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']); // fetch logged in user
    Route::post('/logout', [AuthController::class, 'logout']);
});
