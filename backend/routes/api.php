<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use App\Http\Controllers\AlertsController;

Route::post('/register', [authController::class, 'register']);
Route::post('/login', [authController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [authController::class, 'logout']);



Route::post('/createAlert', [AlertsController::class, 'createAlert']);


// Route::middleware('auth:sanctum')->group(function () {
//     Route::resource('alerts', AlertsController::class);
// });


