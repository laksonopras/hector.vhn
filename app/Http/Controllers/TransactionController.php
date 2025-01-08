<?php

namespace App\Http\Controllers;

use App\Exports\OrderExport;
use App\Models\Order;
use App\Models\Status;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionController extends Controller
{

    public function __construct() {
        \Midtrans\Config::$serverKey = "pakai server dari midtrans";
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = true;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = true;
    }

    public function create($id) {
        $order = Order::find($id);
        try {
            $tagihan = array(
                'transaction_details' => array(
                    'order_id' => $order->id. ':'. rand(),
                    'gross_amount' => $order->price,
                ),
            );
            $snapToken = \Midtrans\Snap::getSnapToken($tagihan);
                    return response()->json($snapToken, 200);
                }catch(Exception $e){
                    return response()->json($e->getMessage(), 500);
            }
    }

    public function getToken (Order $order) {
        $tagihan = array(
            'transaction_details' => array(
                'order_id' => $order->id. ':'. rand(),
                'gross_amount' => $order->price,
            ),
        );
        $snapToken = \Midtrans\Snap::getSnapToken($tagihan);
        return $snapToken;
    }

    public function pay(Request $request) {
        $payment_method = $request->input('payment_method', 'QRIS');
        if($payment_method == 'CASH'){
            $order = $this->store($request->order_id, $payment_method, Auth::user()->id);
            $orderData = json_decode($order->getContent(), true);
            if($orderData['payment_status'] =='Berhasil'){
                return redirect()->back()->with('success', 'Pembayaran berhasil.');
            } else {
                return redirect()->back()->with('success', 'Pembayaran gagal.');
            }
        } else {
            if($request->transaction_status == 'settlement'){
                $order_id = explode(':', $request->order_id);
                $order = $this->store($order_id[0], $payment_method, 0);
                return response()->json([
                    'status' => 'Berhasil',
                    'pesan' => 'Pembayaran berhasil'
                ]);
            }
        }
    }

    public function store($id, $payment_method, $operator) {
        $order = Order::find($id)->load('shoes.service', 'status');
        $payment_status = 'Gagal';
        if($order->payment_status == 0){
            $order->update([
                'order_status' => 5,
                'payment_method' => $payment_method,
                'payment_status' => 1
            ]);
            foreach($order->shoes as $shoes){
                $shoes->update(['status' => 2]);
                foreach($shoes->service as $service){
                    $service->update(['status' => 2]);
                }
            }
            $status = Status::create([
                'status' => $order->order_status,
                'order_id' => $order->id,
                'operator' => $operator,
            ]);

            $shoes ='';
            foreach($order->shoes as $index => $shoe){
                $shoes .= ($index + 1) . '. ' . $shoe['shoes_brand'] . ' ' . $shoe['colour'] . "\n";
                foreach($shoe['service'] as $service){
                    $shoes .= '     ' . $service['product_name'] . "\n";
                }
                $shoes .= '     ' . $shoe['price'];
            }

            $message = "*HECTOR VHN*\nHallo Kak ". $order->customer_name .", \nKami dari Hector VHN ingin menyampaikan bahwa pembayaran pesanan dengan nomor resi ". $order->receipt ." telah berhasil. berikut kami lampirkan bukti pembayarannya.\n\nNomor Pesanan \t\t: ". $order->receipt . "\nAlamat \t\t\t: ". $order->address . "\nTipe Pesanan \t\t: ". ($order->order_type == 0 ? "Non Pickup" : "Pickup") . "\n". $shoes . "\nSub Total \t\t: Rp. " . $order->sub_price . "\nPotongan Harga \t\t: Rp. " . $order->discount . "\nTotal Harga \t\t: Rp. " . $order->price . "\nStatus Pembayaran \t: "  . ($order->payment_status == 0  ? "Belum dibayar" : "Lunas") .  "\n\nMohon tunggu teknisi kami untuk mengerjakan sepatu Kakak. \nTerimakasih.";
            $whatsappController = new WhatsappController();
            $response = $whatsappController->send($order->whatsapp_number, $message);
            $payment_status = 'Berhasil';
        }
        return response()->json([
            'order_id' => $order->receipt,
            'payment_status' => $payment_status,
        ]);
    }

    public function show(Request $request) {
        $datetime = explode('-', $request->input('datetime', now()));   
        $transactions = Order::join('statuses', 'orders.id', '=', 'statuses.order_id')->where('statuses.status', 5)->whereMonth('statuses.created_at',$datetime[1])->whereYear('statuses.created_at', $datetime[0])->select(
            'statuses.created_at as created_at',
            'statuses.operator as operator',
            'orders.receipt as receipt',
            'orders.customer_name as customer_name',
            'orders.payment_method as payment_method',
            'orders.payment_status as payment_status',
            'orders.sub_price as sub_price',
            'orders.discount as discount',
            'orders.price as price',
        )->get();
        return Inertia::render('Admin/Revenue', ['datetime' => $datetime[0] . "-" . $datetime[1], 'transactions' => $transactions]);
    }

    public function export(Request $request) {
        $datetime = Carbon::parse($request->datetime);
        return (new OrderExport($datetime))->download('Pendapatan ' . $datetime . '.xlsx');
    }
}
