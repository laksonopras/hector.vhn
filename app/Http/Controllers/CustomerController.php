<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(){
        $customers = Customer::all();
        return Inertia::render('Admin/Customer', ['customers' => $customers]);
    }

    public function create(Request $request){
        $validated = $request->validate([
            'whatsapp_number' => 'required|string|regex:/^[0-9]+$/|max:255|unique:'.Customer::class,
            'customer_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);
        $customer = Customer::create([
            'whatsapp_number' => $request->whatsapp_number,
            'customer_name' => $request->customer_name,
            'address' => $request->address,
        ]);
        return redirect()->back();
    }

    public function store(Request $request){
        $customer = Customer::updateOrCreate(
            ['whatsapp_number' => $request->whatsapp_number],
            [
                'whatsapp_number' => $request->whatsapp_number,
                'customer_name' => $request->customer_name,
                'address' => $request->address,
            ]
        );
        $customer->increment('order_count');
        return response()->json($customer);
    }

    public function update(Request $request, $id){
        $customer = Customer::find($id);
        $customer->update([
            'whatsapp_number' => $request->whatsapp_number,
            'customer_name' => $request->customer_name,
            'address' => $request->address,
        ]);
        return redirect()->back()->with('success', 'Perubahan berhasil disimpan.');
    }

    public function destroy($id){
        $customer = Customer::destroy($id);
        return redirect()->back()->with('success', 'Pelanggan berhasil dihapus.');
    }
}
