<?php

namespace App\Http\Controllers;

use App\Http\Controllers\WhatsappController;
use App\Models\Order;
use App\Models\Product;
use App\Models\Service;
use App\Models\Shoes;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller {
    protected $order_status = [
        'dibatalkan', 'berhasil dibuat', 'sedang dipickup oleh kurir', 'menunggu finalisasi oleh admin', 'menunggu pembayaran', 'menunggu antrean', 'sedang dikerjakan', 'selesai dikerjakan', 'sedang diantar oleh kurir', 'selesai'
    ];

    public function index(Request $request) {
        if($request->input('status')){
            switch($request->status){
                case 1 :
                    $orders = Order::where('order_status', 1)->get();
                    return Inertia::render('Admin/NewOrder', ['orders' => $orders]);
                case 2 :
                    $orders = Order::where('order_status', 2)
                    ->join('statuses', 'orders.id', '=', 'statuses.order_id')
                    ->whereColumn('statuses.status', 'orders.order_status')
                    ->where('operator', '=', Auth::user()->id)
                    ->orderBy('order_status')
                    ->select('orders.id as id','orders.receipt', 'orders.customer_name', 'orders.address', 'orders.whatsapp_number', 'orders.order_status')
                    ->get(); 
                    return Inertia::render('Admin/Pickup', ['orders' => $orders]);
                case 3 :
                    $orders = Order::where('order_status', 3)->get();
                    return Inertia::render('Admin/Receive', ['orders' => $orders]);
                case 4 :
                    $orders = Order::where('order_status', 4)->get();
                    return Inertia::render('Admin/Payment', ['orders' => $orders]);
                case 5 :
                    $orders = Service::where('status', 2)->with('shoes.order')->get();
                    return Inertia::render('Admin/WaitingList', ['orders' => $orders]);
                case 6 :
                    $orders = Service::where('status', 3)->with('shoes.order')->get();
                    return Inertia::render('Admin/Production', ['orders' => $orders]);
                case 7 :
                    $orders = Order::where('order_status', '=', 7)->get();
                    return Inertia::render('Admin/Finish', ['orders' => $orders]);
                case 8 :
                    $orders = Order::where('order_status', 8)
                    ->join('statuses', 'orders.id', '=', 'statuses.order_id')
                    ->whereColumn('statuses.status', 'orders.order_status')
                    ->where('operator', '=', Auth::user()->id)
                    ->orderBy('order_status')
                    ->select('orders.id as id','orders.receipt', 'orders.customer_name', 'orders.address', 'orders.whatsapp_number', 'orders.order_status')
                    ->get();
                    return Inertia::render('Admin/Delivery', ['orders' => $orders]);
                case 9 :
                    $orders = Order::where('order_status', '<', 1)->orWhere('order_status', '>', 8)->orderBy('id', 'desc')->get();
                    return Inertia::render('Admin/Archive', ['orders' => $orders]);
            }
        } else {
            $orders = Order::all();
            return Inertia::Render('Admin/Order', ['orders' => $orders]);
        }
    }

    public function create() {
        $product = Product::all();
        if(request()->route()->getName() == 'buat-pesanan-admin'){
            return Inertia::render('Admin/CreateOrder', ['products' => $product]);
        } else {
            return Inertia::render('CreateOrder', ['products' => $product]);
        }
    }

    public function store(Request $request) {

        // dd($request->file('before_photo'));
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'whatsapp_number' => 'required|string|regex:/^[0-9]+$/|max:255',
            'address' => 'required|string|max:255',
            'shoes' => 'required',
            'before_photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $customer = new CustomerController();
        $response = $customer->store(new Request(
            [
                'whatsapp_number' => $request->whatsapp_number,
                'customer_name' => $request->customer_name,
                'address' => $request->address,
            ]
        ));
        $order = Order::create([
            'customer_name' => $request->customer_name,
            'receipt' => 0,
            'before_photo' => Storage::disk('public')->put('before', $request->file('before_photo')),
            'order_type' => $request->order_type,
            'order_status' => $request->order_type == 1 ? 1 : 3,
            'whatsapp_number' => $request->whatsapp_number,
            'address' => $request->address,
            'sub_price' => $request->sub_price,
            'discount' => $request->discount,
            'price' => $request->price,
        ]);
        foreach($request->shoes as $shoe) {
            $shoes = Shoes::create([
                'shoes_brand' => $shoe['shoes_brand'],
                'colour' => $shoe['colour'],
                'note' => $shoe['note'],
                'price' => $shoe['price'],
                'status' => 1,
                'order_id' => $order->id, 
            ]);
            foreach($shoe['service'] as $service){
                if($service['id']){
                    $order->shoes->service = Service::create([
                        'product_name' => $service['product_name'],
                        'product_category' => $service['product_category'],
                        'discount' => $service['discount'],
                        'price' => $service['price'],
                        'status' => $shoes->status,
                        'shoes_id' => $shoes->id
                    ]);
                }
            }
        }
        $order->update(['receipt' => $order->created_at->format('Y') . 
            $order->created_at->format('m') .
            $order->created_at->format('d') .
            $order->created_at->format('H') .
            $order->created_at->format('i') .
            $order->created_at->format('s')
        ]);

        $status = new StatusController();
        $status->store($order->id, $order->order_status, $request->create_type == 0 ? 0 : Auth::user()->id);

        $new_order = Order::find($order->id)->load('shoes.service', 'status');
        
        $shoes ='';

        foreach($new_order->shoes as $index => $shoe){
            $shoes .= ($index + 1) . '. ' . $shoe['shoes_brand'] . ' ' . $shoe['colour'] . "\n";
            foreach($shoe['service'] as $service){
                $shoes .= '     ' . $service['product_name'] . "\n";
            }
            $shoes .= '     ' . $shoe['price'];
        }

        $message = "*HECTOR VHN*\nHallo Kak ". $new_order->customer_name .", \nKami dari Hector VHN ingin menyampaikan bahwa pesanan Kakak berhasil dibuat dengan detail pesanan sebagai berikut :\n\nNomor Pesanan \t\t: ". $new_order->receipt . "\nAlamat \t\t\t: ". $new_order->address . "\nTipe Pesanan \t\t: ". ($new_order->order_type == 0 ? "Non Pickup" : "Pickup") . "\n". $shoes . "\nSub Total \t\t: Rp. " . $new_order->sub_price . "\nPotongan Harga \t\t: Rp. " . $new_order->discount . "\nTotal Harga \t\t: Rp. " . $new_order->price . "\nStatus Pembayaran \t: "  . ($new_order->payment_status == 0  ? "Belum dibayar" : "Lunas") .  "\n\nKakak bisa menggunakan ID Pesanan ini untuk memantau progres pesanan Kakak melalui link berikut ini : https://hector.vhn/cek-pesanan. \nTerimakasih.";
        $whatsappController = new WhatsappController();
        $response = $whatsappController->send($new_order->whatsapp_number, $message);
        
        if ($request->create_type == 0){
            session()->flash('success', 'Pesanan berhasil dibuat.');
            return Inertia::render('OrderDetail', ['order' => $new_order]);
        } else {
            return redirect("pesanan/" . $order->id);
        }
    }

    public function show(Request $request) {
        if($request->receipt != null){
            $order = Order::where('receipt', $request->receipt)->with('shoes.service', 'status')->first();
            if($order == null){
                return back()->with('error', 'Nomor resi ' . $request->receipt . ' tidak ditemukan');
            } else {
                if(request()->route()->getName() == 'cari-pesanan'){
                    $products = Product::all();
                    return Inertia::render('Admin/OrderDetail', ['products' => $products, 'order' => $order]);
                } else {
                    return Inertia::render('OrderDetail', ['order' => $order]);
                }
            }
        } else {
            return redirect()->back()->with('error', 'Nomor resi tidak boleh kosong');
        }
    }

    public function edit($id) {
        try {
            $order = Order::findOrFail($id)->load('shoes.service', 'status');
            $products = Product::all();
            return Inertia::render('Admin/OrderDetail', ['products' => $products, 'order' => $order]);
        } catch (ModelNotFoundException $e) {
            return redirect()->back();
        }

    }

    public function update(Request $request, $id) {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'whatsapp_number' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'shoes' => 'required',
        ]);

        $order = Order::find($id);
        Shoes::where('order_id', $id)->delete();

        if($request->file('after_photo') != null){
            $request->validate([
                'after_photo' => 'image|mimes:jpeg,png,jpg|max:2048',
            ]);

            $order->update([
                'after_photo' => Storage::disk('public')->put('after', $request->file('after_photo'))
            ]);
        }

        $order->update([
            'customer_name' => $request->customer_name,
            'whatsapp_number' => $request->whatsapp_number,
            'address' => $request->address,
            'sub_price' => $request->sub_price,
            'discount' => $request->discount,
            'price' => $request->price,
        ]);

        foreach($request->shoes as $shoe) {
            $shoes = Shoes::create([
                'shoes_brand' => $shoe['shoes_brand'],
                'colour' => $shoe['colour'],
                'note' => $shoe['note'],
                'price' => $shoe['price'],
                'status' => $order->order_status == 5 ? 2 : 1,
                'order_id' => $order->id, 
            ]);

            foreach($shoe['service'] as $service){
                if($service['id']){
                    $order->shoes->service = Service::create([
                        'product_name' => $service['product_name'],
                        'product_category' => $service['product_category'],
                        'discount' => $service['discount'],
                        'price' => $service['price'],
                        'status' => $shoes->status,
                        'shoes_id' => $shoes->id
                    ]);
                }
            }
        }
        return redirect()->route("detail-pesanan", $order->id)->with('success', 'Data berhasil diubah');
    }

    public function updateStatus(Request $request) {
        $order = Order::find($request->id);
        if ($order->order_status > 0 && $order->order_status < 9){
            if ($order->order_status != $request->status){
                $order->update(['order_status' => $request->status]);

                $status = new StatusController();
                $status->store($order->id, $order->order_status, Auth::user()->id);

                $message = "HECTOR VHN \nHallo Kak ". $order->customer_name .", \nKami dari Hector VHN ingin menyampaikan bahwa pesanan Kakak dengan nomor resi : ". $order->receipt ."\nsaat ini sedang " .  $this->order_status[$order->order_status] ."\nTerimakasih.";
                
                $whatsappController = new WhatsappController();
                $whatsappController->send($order->whatsapp_number, $message);
                
                return redirect()->back()->with('success', 'Status pesanan telah diubah.');
            } else {
                return redirect()->back()->with('error', 'Status pesanan saat ini' . $this->order_status[$order->order_status] . '. Harap muat ulang.');
            }
        } else {
            return redirect()->back()->with('error', 'Status pesanan tidak dapat diubah. Sebab pesanan telah' . $order->order_status == 0 ? 'dibatalkan' : 'selesai' .'.');
        }
    }

    public function destroy($id) {
        $order = Order::find($id)->load('shoes.service', 'status');
        $order->update(['order_status' => 0]);
        foreach ($order->shoes as $shoes) {
            $shoes->update(['status' => 0]);
            foreach($shoes->service as $service){
                $service->update(['status' => 0]);
            }
        }

        $status = new StatusController();
        $status->store($order->id, $order->order_status, Auth::user()->id);

        return redirect()->back()->with('success', 'Pesanan telah dibatalkan.');
    }
}
