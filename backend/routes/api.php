<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use App\Http\Controllers\CrimeAlertController;
use App\Http\Controllers\LocationController;

Route::post('/register', [authController::class, 'register']);
Route::post('/login', [authController::class, 'login']);

Route::middleware('auth:sanctum')->post('/logout', [authController::class, 'logout']);



Route::middleware('auth:sanctum')->post('/createAlert', [CrimeAlertController::class, 'create']);
Route::middleware('auth:sanctum')->post('/UpdateAlert', [CrimeAlertController::class, 'Update']);
Route::middleware('auth:sanctum')->post('/DeleteAlert', [CrimeAlertController::class, 'Delete']);
Route::middleware('auth:sanctum')->get('/getMyAlerts', [CrimeAlertController::class, 'getMyAlerts']);
Route::middleware('auth:sanctum')->get('/getNearByAlerts', [CrimeAlertController::class, 'getNearByAlerts']);

Route::get('/locations', [LocationController::class, 'index']);


