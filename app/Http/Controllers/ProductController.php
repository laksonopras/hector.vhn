<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller {

    public function index()
    {
        $products = Product::all();

        return Inertia::render('Admin/Products', ['products' => $products] );
    }

    public function store(Request $request) {
        $request->validate([
            'nama_produk' => 'required|string|max:255',
            'diskon' => 'required|integer|regex:/^[0-9]/',
            'harga' => 'required|integer|regex:/^[0-9]/',
        ]);

        $produk = Product::create([
            'nama_produk' => $request->nama_produk,
            'harga' => $request->harga,
            'diskon' => $request->diskon,
        ]);

        return redirect('produk-layanan');
    }

    public function update(Request $request, $id) {
        $produk = Product::find($id);
        $produk->update($request->all());

        return response()->json($produk);
    }

    public function destroy($id) {
        $produk = Product::destroy($id);
        
        return redirect('produk-layanan');
    }
}
