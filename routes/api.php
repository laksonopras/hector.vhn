<?php

use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/pembayaran/berhasil', [TransactionController::class, 'berhasil']);
Route::post('/pembayaran', [TransactionController::class, 'pay']);
Route::get('/pembayaran/{id}', [TransactionController::class, 'create']);

// Route::get('/pembayaran/finish', [PesananController::class, 'afterPayment']);
