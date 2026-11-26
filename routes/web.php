<?php

use App\Http\Controllers\AdoptionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ShelterAnimalController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::resource('shelter-animals', ShelterAnimalController::class)->only([
        'index',
        'create',
        'store',
        'edit',
        'update',
        'destroy',
    ]);

    Route::resource('adoptions', AdoptionController::class)->only([
        'index',
        'create',
        'store',
        'update',
    ]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
