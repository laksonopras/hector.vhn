<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\Service;
use App\Models\Shoes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shoes = Shoes::all();
        foreach($shoes as $shoe){
            
            $num = rand(0, 2);
            for($i = 0; $i <= $num; $i++ ){
                $product = Product::where('product_category', $i)->inRandomOrder()->first();

                $service = Service::create([
                    'product_name' => $product->product_name,
                    'product_category' => $product->product_category,
                    'discount' => $product->discount,
                    'price' => $product->price,
                    'status' => $shoe->status,
                    'shoes_id' => $shoe->id,
                    'created_at' => $shoe->created_at,
                    'updated_at' => $shoe->updated_at,
                ]);
                $service->update(['operator' => $shoe->status > 2 ?  1 : null]);
                $shoe->update(['price' => $shoe->price + $service->price]);
            }
            $order = Order::find($shoe->order_id);
            $order->update(['sub_price' => $order->sub_price + $shoe->price]);
            $order->update(['price' => $order->sub_price - $order->discount]);
        };
    }
}
