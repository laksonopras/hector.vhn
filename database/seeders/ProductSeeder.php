<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $produk = [
            ['id' => 1, 'product_name' => 'Fast Cleaning', 'product_category' => 0, 'price' => 25000 ],
            ['id' => 2, 'product_name' => 'Deep Cleaning', 'product_category' => 0, 'price' => 40000 ],
            ['id' => 3, 'product_name' => 'Deep Cleaning + Sterilisasi Ozon UV', 'product_category' => 0, 'price' => 45000 ],
            ['id' => 4, 'product_name' => 'Hard Cleaning ', 'product_category' => 0, 'price' => 50000 ],
            ['id' => 5, 'product_name' => 'Reglue Medium', 'product_category' => 1, 'price' => 50000 ],
            ['id' => 6, 'product_name' => 'Reglue Hard', 'product_category' => 1, 'price' => 70000 ],
            ['id' => 7, 'product_name' => 'Recolour', 'product_category' => 2, 'price' => 150000 ],
            ['id' => 8, 'product_name' => 'Whitening', 'product_category' => 2, 'price' => 70000 ],
        ];

        foreach ($produk as $item){
            Product::create($item);
        }
    }
}
