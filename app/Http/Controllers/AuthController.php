<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\Order;
use App\Models\Service;
use App\Models\Shoes;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AuthController extends Controller {
    
    public function index() {
        $order_statistics = Order::select('order_status', DB::raw('count(*) as order_count'))->where('order_status', '!=', '0')->where('order_status', '!=', 9)->groupBy('order_status')->get();
        $order_count = Order::count();
        $shoes_count = Shoes::count();
        $customer_count = Order::distinct('customer_name')->count('customer_name');
        $service_statistics = Service::select('product_name', DB::raw('count(*) as count'))->groupBy('product_name')->get();
        return Inertia::render('Admin/Dashboard', [
            'order_statistics' => $order_statistics,
            'order_count' => $order_count,
            'shoes_count' => $shoes_count,
            'customer_count' => $customer_count,
            'service_statistics' => $service_statistics
        ]);
    }

    public function create() {
        return Inertia::render('Auth/Login');
    }

    public function store(LoginRequest $request): RedirectResponse {

        $request->validate([
            'email' => 'required|string|lowercase|email|max:255',
            'password' => 'required',
        ]);

        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false))->with('success', 'Selamat datang ' . Auth::user()->name);
    }

    public function destroy(Request $request): RedirectResponse {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('login');
    }
}
