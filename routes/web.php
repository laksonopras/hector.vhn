<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ShoesController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {return Inertia::render('Homepage');})->name('homepage');
Route::get('/buat-pesanan', [OrderController::class, 'create'])->name('buat-pesanan-guest');
Route::post('/buat-pesanan', [OrderController::class, 'store']);
Route::get('/cek-pesanan', function () {return Inertia::render('OrderCheck');})->name('cek-pesanan');
Route::post('/cek-pesanan', [OrderController::class, 'show']);
Route::get('/pesanan/bayar/{id}', [TransactionController::class, 'create']);


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [AuthController::class, 'index'])->name('dashboard');
    Route::get('/pesanan/buat', [OrderController::class, 'create'])->name('buat-pesanan-admin');
    Route::post('/pesanan/buat', [OrderController::class, 'store']);
    Route::get('/pesanan/baru', [OrderController::class, 'index'])->name('pesanan-baru');
    Route::get('/pesanan/sedang-diambil', [OrderController::class, 'index'])->name('pickup-pesanan');
    Route::get('/pesanan/sudah-diambil', [OrderController::class, 'index'])->name('finalisasi-pesanan');
    Route::get('/pesanan/pembayaran', [OrderController::class, 'index'])->name('pembayaran');
    Route::get('/pesanan/dalam-antrean', [OrderController::class, 'index'])->name('menunggu-antrean');
    Route::get('/pesanan/sedang-dikerjakan', [OrderController::class, 'index'])->name('sedang-dikerjakan');
    Route::get('/pesanan/selesai-dikerjakan', [OrderController::class, 'index'])->name('selesai-dikerjakan');
    Route::get('/pesanan/sedang-diantar', [OrderController::class, 'index'])->name('delivery-pesanan');
    Route::get('/pesanan/arsip', [OrderController::class, 'index'])->name('arsip');
    Route::post('/pesanan/status', [OrderController::class, 'updateStatus']);
    Route::post('/pesanan/cari', [OrderController::class, 'show'])->name('cari-pesanan');
    Route::post('/sepatu/{id}/status', [ServiceController::class, 'updateStatus']);
    Route::get('/pesanan/{id}', [OrderController::class, 'edit'])->name('detail-pesanan');
    Route::post('/pesanan/{id}', [OrderController::class, 'update'])->name('perbarui-pesanan');
    Route::delete('/pesanan/{id}', [OrderController::class, 'destroy']);
    Route::get('/pesanan', [OrderController::class, 'index'])->name('pesanan');
    Route::get('/pengerjaan', [ShoesController::class, 'index'])->name('pengerjaan');
    Route::get('/riwayat-penugasan', [UserController::class, 'showHistory'])->name('riwayat-penugasan');
    Route::get('/produk-layanan', [ProductController::class, 'index'])->name('produk-layanan');
    Route::post('/user/{id}', [UserController::class, 'update']);
    Route::get('/profile', [UserController::class, 'show'])->name('profile');
    Route::get('/pelanggan', [CustomerController::class, 'index'])->name('pelanggan');
    Route::post('/pelanggan', [CustomerController::class, 'create']);
    Route::post('/pelanggan/{id}', [CustomerController::class, 'update']);
    Route::delete('/pelanggan/{id}', [CustomerController::class, 'destroy']);
    Route::get('/pengumuman', [AnnouncementController::class, 'index'])->name('pengumuman');
    Route::post('/pengumuman', [AnnouncementController::class, 'store']);
    Route::get('/pengguna', [UserController::class, 'index'])->name('pengguna');
    Route::get('/pendapatan/export', [TransactionController::class, 'export']);
    Route::get('/pendapatan', [TransactionController::class, 'show'])->name('pendapatan');
    Route::post('/pendapatan', [TransactionController::class, 'show']);
    Route::post('/pembayaran', [TransactionController::class, 'pay']);
});

require __DIR__.'/auth.php';
