<?php

use App\Http\Controllers\API\V1\Admin\AdminRolePermissionsController;
use App\Http\Controllers\API\V1\Admin\AdminUserController;
use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\API\V1\ProductController;
use App\Http\Controllers\API\V1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Check Auth
    Route::get('/auth-check', [AuthController::class, 'authCheck']);

    // Secure Routes
    Route::middleware('auth:sanctum')->group(function () {
        // User Info
        Route::get('/user', [UserController::class, 'index']);

        // Logout
        Route::post('/logout', [AuthController::class, 'logout']);

        // Admin Specific Routes
        Route::prefix('admin')->group(function () {
            Route::get('/users', [AdminUserController::class, 'index']);
            Route::get('/users/{id}', [AdminUserController::class, 'show']);
            Route::get('/users/all/ids', [AdminUserController::class, 'getIds']);
            Route::post('/users', [AdminUserController::class, 'store']);
            Route::put('/users', [AdminUserController::class, 'update']);
            Route::delete('/users/{id}', [AdminUserController::class, 'destroy']);
            Route::delete('/users/delete-multiple', [AdminUserController::class, 'deleteMultiple']);

            // Roles & Permissions
            Route::get('/roles-permissions', [AdminRolePermissionsController::class, 'index']);
            Route::get('/role-permissions', [AdminRolePermissionsController::class, 'rolePermissions']);
            Route::put('/role-permissions', [AdminRolePermissionsController::class, 'updateRolePermissions']);
        });

        // Products
        Route::apiResource('/products', ProductController::class);
    });
});
