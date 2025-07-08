<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;

Route::post('/register', [authController::class, 'register']);
Route::post('/login', [authController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [authController::class, 'logout']);
