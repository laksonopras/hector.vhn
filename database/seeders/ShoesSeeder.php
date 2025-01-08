<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Shoes;
use App\Models\Status;
use App\Models\Transaction;
use DateTime;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShoesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Converse', 'Vans', 'New Balance', 'Under Armour', 'Asics', 'Skechers', 'Fila', 'Timberland', 'Dr. Martens', 'Crocs', 'Onitsuka Tiger'];
        $colours = ['merah', 'orange', 'kuning', 'hijau', 'biru', 'abu-abu', 'ungu', 'hitam', 'putih']; 
        $num = 0;
        $orders = Order::all();
        $date_time = new DateTime('2024-01-01 11:45:20');
        $paymnet_method = ['Tunai', 'QRIS'];

        foreach($orders as $order){
            if($order->id % 3){
                $date_time->modify('+2 days');
            }
            $order->update([
                'receipt' => $order->created_at->format('Y') . 
                                $order->created_at->format('m') .
                                $order->created_at->format('d') .
                                $order->created_at->format('H') .
                                sprintf('%04d', $num++),
                'order_type' => $order->order_status < 3 ? 1 : rand(0,1),
                'after_photo' => $order->order_status > 6 ? 'after/after.jpg' : null, 
                'payment_status' => $order->order_status < 5 ? 0 : 1,
                'payment_method' => $order->order_status < 5 ? null : $paymnet_method[rand(0, 1)],
                'created_at' => $date_time->format('Y-m-d H:i:s'),
                'updated_at' => $date_time->format('Y-m-d H:i:s'),
            ]);

            $n = rand(1,3);

            for($i = 0; $i < $n; $i++){
                $shoes = Shoes::create([
                    'shoes_brand' => $brands[array_rand($brands)],
                    'colour' => $colours[array_rand($colours)],
                    'note' => fake()->text(5),
                    'status' => $order->order_status == 0  ? 0 : ($order->order_status < 5 ? 1 : ($order->order_status ==  5 ? 2 : ($order->order_status == 6 ? 3 : 4))),
                    'price' => 0,
                    'order_id' => $order->id,
                    'created_at' => $order->created_at,
                    'updated_at' => $order->updated_at,
                ]);
            }
            for ($i = ($order->order_type == 1 ? 1 : 3); $i <= ($order->order_status == 0 ? rand(1, 3) : $order->order_status); $i++){
                
                if($i == 8 && $order->order_type == 0 ) {
 
                } else {
                    $status = Status::create([
                        'status' => $i,
                        'order_id' => $order->id,
                        'operator' => $i == 5 && $order->payment_method == 'QRIS' ? 1 : 1,
                        'created_at' => $order->created_at,
                        'updated_at' => $order->updated_at,
                    ]);
                }
            }
        }
    }
}
